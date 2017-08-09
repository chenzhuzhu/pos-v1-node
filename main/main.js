'use strict';

const datbase= require('../main/datbase.js');

function expand(collection){
      let new_arr=[];
      
      for(let each_item of collection){
            if (each_item.includes('-')){
                  let expanded_array = each_item.split('-');
                  let key =expanded_array[0];
                  let value = expanded_array[1];
                  push(new_arr,key,value);
            }else{
                  new_arr.push(each_item)
            }     
      }
//      console.log(new_arr); 
      return new_arr;
}

function push(result,key,value){
      for(let i =0;i<value;i++){
            result.push(key);
      }
      return result;      
}

function toCountList(collection){
      let new_arr=[];
      for(let item of collection){
            let obj = find(new_arr,item)
            if(obj){
                  obj.count++;
            }else{
                  new_arr.push({key:item,count:1})
            }
      }
      return new_arr;
}

function find(collection,item){
      for(let obj of collection){
            if(obj.key ==item){
                  return obj
            }
      }
      return false;
}


//2# 购物单计数 得出key-value对象
function countShoppingList(shopping_list){
      
      let temp_list =expand(shopping_list);
      let counted_list =toCountList(temp_list);    
      // console.log(counted_list);
      return counted_list;
}

function findItemInfo(collection,item){
      for(let each_info of collection){
            if(each_info['barcode'] == item){
                  return each_info
            }
      }
      return false     
} 
  
//3# 依据loadAllItems()中return的内容，得出详细的购物清单
function getListInfo(counted_list){
      let new_arr=[];
      let all_list_info=datbase.loadAllItems()  //4#
      for(let each_counted_list of counted_list){
            let finded_info = findItemInfo(all_list_info,each_counted_list['key'])
            if(finded_info){
                  finded_info.count = each_counted_list['count']
                  new_arr.push(finded_info);
            }
      }
      // console.log(new_arr);
      return new_arr;           
}

function findPromotionInfo(collection,item){
      for(let each of collection){

            if(each==item['barcode']){
                  return item
            }
      }
      return false
}

function hasFree(item){
      if(item>2){
            item=1
      }
      return item

}
function BuyTwoGetOneFree(temp_arr){
      let replace_arr = [];

      for(let each_temp_arr of temp_arr){
            let barcode =each_temp_arr.barcode
            let name =each_temp_arr.name
            let price =each_temp_arr.price
            let count =each_temp_arr.count
            let unit = each_temp_arr.unit
            let every_new ={barcode,name,unit,price,count}
            replace_arr.push(every_new)
      }
      for(let each_replace of replace_arr){
            each_replace.count = hasFree(each_replace.count)
      }
      return replace_arr;


}
//5# 依据loadPromotions()中return的内容，得出优惠的内容
function countPromotions(list_detail_info){
      let promotion_arr;
      let temp_arr=[];
      let promotion_list = datbase.loadPromotions()  //6#
      for(let each_detail_info of list_detail_info){
            let finded_promotion = findPromotionInfo(promotion_list[0]['barcodes'],each_detail_info)
            if (finded_promotion){
                  temp_arr.push(each_detail_info);
            }
      }
      promotion_arr = BuyTwoGetOneFree(temp_arr);

      return promotion_arr;

}

function findReduce(collection,item){
      for(let each of collection){
            if (each.name == item.name){
                  return each
            }
      }
      return false
}
//#7 总计购买所有东西的金额
//输出：
// '***<没钱赚商店>购物清单***\n' +
// '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
// '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
// '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
// // '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
function sumAll(all_collection,promotion_collection){
      let collection=[];
      for(let all_item of all_collection){
            let to_reduce =findReduce(promotion_collection,all_item)
            if(to_reduce){
                  let name=all_item.name
                  let count=all_item.count
                  let unit = all_item.unit
                  let price =all_item.price
                  let total =(all_item.count-to_reduce.count)*all_item.price
                  let new_reduce_result ={name,count,unit,price,total}
                  collection.push(new_reduce_result)
            }else{
                  all_item.total =all_item.count*all_item.price
                  collection.push(all_item)

            }

      }

      let print_part1 ='***<没钱赚商店>购物清单***\n';
      for(let item of collection){
            print_part1 +='名称：'+item.name+'，数量：'+item.count+item.unit+'，单价：'+item.price.toFixed(2)+'(元)，小计：'+item.total.toFixed(2)+'(元)\n'
      }

      return print_part1
}

// #8 总计买二赠一的东西
// 输出：
// '挥泪赠送商品：\n' +
// '名称：雪碧，数量：1瓶\n' +
// '名称：方便面，数量：1袋\n' +
function sumPromotion(collection){
      let print_part1 ='挥泪赠送商品：\n';
      for(let item of collection){
            print_part1 +='名称：'+item.name+'，数量：'+item.count+item.unit+'\n';
      }
      return print_part1
}

function sumMoneyPromotion(collection){
      let sum=0 ;
      for(let item of collection){
            sum+=item.count*item.price;
      }
      return sum

}

function sumMoneyType(all,promotion){
      let sum=0 ;
      let pro =0;
      for(let item of all){
            sum+=item.count*item.price;
      }
      for(let item of promotion){
            pro+=item.count*item.price;
      }
      let total_sum =sum -pro;
      return total_sum


}

//#9 计价
//输出
//'总计：51.00(元)\n' +
// '节省：7.50(元)\n' +
function sumMoney(all,promotion){
      let all_products_money = sumMoneyType(all,promotion);
      let promotion_products_money=sumMoneyPromotion(promotion);
      let result ='总计：'+all_products_money.toFixed(2)+'(元)\n'+'节省：'+promotion_products_money.toFixed(2)+'(元)\n';
      return result
}

function printResult(result_list_detail_info,result_promotion_list,all_type_money){
      return result_list_detail_info+'----------------------\n' +result_promotion_list+'----------------------\n' +all_type_money+'**********************'

}

module.exports = function printInventory(inputs){
      let counted_list = countShoppingList(inputs);
      let list_detail_info=getListInfo(counted_list);  //购买所有东西的详细信息
      let promotion_list = countPromotions(list_detail_info)
      let result_list_detail_info = sumAll(list_detail_info,promotion_list)
      let result_promotion_list =sumPromotion(promotion_list)
      let all_type_money=sumMoney(list_detail_info,promotion_list)
      console.log(printResult(result_list_detail_info,result_promotion_list,all_type_money))
      
};