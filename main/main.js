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
      console.log(counted_list);
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
      console.log(new_arr);
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
//5# 依据loadPromotions()中return的内容，得出优惠的内容
function countPromotions(list_detail_info){
      let new_arr =[];
      let promotion_list = datbase.loadPromotions()  //6#
      for(let each_detail_info of list_detail_info){
            let finded_promotion = findPromotionInfo(promotion_list['barcodes'],each_detail_info)
            if (finded_promotion){
                  new_arr.push();
            }
      }
      console.log(new_arr);
      return new_arr;
      
}

function sumAll(){
      
}

function sumPromotion(){
      
}

function sumMoney(){
      
}

function printResult(){
      
}

module.exports = function printInventory(inputs){
      let counted_list = countShoppingList(inputs);
      let list_detail_info=getListInfo(counted_list);
      c
      
      
};