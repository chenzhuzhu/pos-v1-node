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
      console.log(new_arr);
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


//2# 
function countShoppingList(shopping_list){
      
      let temp_list =expand(shopping_list);
      let counted_list =toCountList(temp_list);
      
      return counted_list

            
}
      
      
      
function getListInfo(){
      
      
}

function countPromotions(){
      
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
      countShoppingList(inputs)
      
};