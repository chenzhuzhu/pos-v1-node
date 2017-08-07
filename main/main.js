function expand(collection){
      let new_arr=[];
      for(let each_item of collection){
            if (each_item.includes('-')){
                  expanded_array = each_item.split('-');
                  let key =expanded_array[0];
                  let value = expand_array[1];
                  push(new_arr,key,value);
            }else{
                  new_arr.push(each_item)
            }
      console.log(new_arr);
      return new_arr;
}

function push(result,key,value){
      for(let i =0;i<value;i++){
            result.push(key);
      }
      return result;      
}
function countShoppingLIst(shopping_list){
      let counted_list=[];
      let temp_list=[];
      temp_list =expand(shopping_list);
      return temp_list

            
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


module.exports = function printInventory(inputs) {
      countShoppingLIst(inputs);
      
};