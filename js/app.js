console.log(Redux);

// مثال لو عايز اروح البينك عشان اسحب 100 ج

// الرديوس دا عبارة عن ان انا لو جالى اكشن اعمل كذا ولو جالى اكشن اعمل كذا
// فا الرديوسر بتتشك على الاكشن الى بيجيى ليها

// فا انا هلقلو مثلا بيبداء 1000 ج و بياخد منى الاكشن

// فا انا بقلو لو التيب دا بيساوى الكلام دا اعمل كذاtypeانا بقلو فى الاسويتش فى حالة احط الاكشن و بعدها بقلو دوت 

let action = {
 type : 'withdraw_money' // متنساش دا اوبجيت يعنى ممكن اسميعم اى حاجة صباحة الفل 
};

let action2 = {
 type : 'Deposite_money'
};

let withdraw = (amount) => {

return {
 type : 'withdraw_money2',  
 payload : amount

} // return

};

let deposit_money2 = 'deposit_money2';

let deposit = (amount) => {

 return {
  type :  deposit_money2,  
  payload : amount
 
 } // return
 
 };

let reducer = (state = 1000 , action) => {
 switch (action.type) {
  case'withdraw_money' :
   return state - 100 ;

   case'Deposite_money' :
   return state + 100 ;

   case'withdraw_money2' :
   return state - action.payload ;

   case deposit_money2 :
   return state + action.payload ;

  default: return state;
  
 }

}
// after reducer i make  Redux.createStore(and i put the varible)
let store = Redux.createStore(reducer);

console.log(store); // {dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, @@observable: ƒ}

console.log(store.getState());// 1000


console.log(store.dispatch(action));// 1000 دى بتنفذ الكود الى انا طلبو منها الى هو الاكشن انا حاطط الاكشن الى هى بتاعت اول وحدة فوق 

console.log(store.getState());// 900 دى من خلالها اقدر اجيبمنها الدتا


console.log(store.dispatch(action));

console.log(store.getState()); // 800

// subscribe = هيقول تلقى بعدها على طول نقص كام او زود كام على حسب الاكشن الى انا طلبوdispatch عشان انا اما اعمل  getState دى عكس 
//  عشان اعرف نقص كام getState فا مش لزم اعمل كل شوية زاى 

store.subscribe (() => {
 console.log('current state', store.getState());
})


console.log(store.dispatch(action)); // 700


console.log(store.dispatch(action2)); // 800

console.log(store.dispatch(withdraw(200))); // 600

console.log(store.dispatch(withdraw(500))); // 100


console.log(store.dispatch(deposit(1000))); // 1100

// part two

let add_product = 'add_product';

let AddProduct = (product) => {

 return {
  type :  add_product,  
  payload : product
 
 } // return
 
 };

 let get_Product = 'get_Product';

 let getProduct = (products) => {
  return {
      type : get_Product,
      payload : products
    }
 };

let FetchgetProduct =  () => {

 return async (dispatch) => {
  let res = await fetch('https://fakestoreapi.com/products/');
  let data = await res.json();
  console.log(data);
  dispatch(getProduct(data)); 
 } // async

 };

 let fetchProduct_one = async () => {
 let res = await fetch('https://fakestoreapi.com/products/');
 let data = await res.json();
 console.log(data);

  return {
  type : get_Product,
 }

 }

let Bank_reducer = (state = 2000 , action) => {
 switch (action.type) {
  
  case'withdraw_money2' :
  return state - action.payload ;

   case deposit_money2 :
   return state + action.payload ;

  default: return state;
  
 }

}

let Product_reducer = (state = [] , action) => {
 switch (action.type) {

   case get_Product :
    //  console.log(action.payload);
    return [...state , ...action.payload] ;

    case add_product :
      return [ ...state , action.payload] ;
   

  default: return state;
  
 }

}



// let store2 = Redux.createStore(Bank_reducer);

let app_reducer = Redux.combineReducers ({
 bank : Bank_reducer,
 product :Product_reducer
});

let store3 = Redux.createStore(app_reducer);

let store4 = Redux.createStore(app_reducer , Redux.applyMiddleware(ReduxThunk));

let store5 = Redux.createStore(app_reducer , Redux.applyMiddleware(ReduxThunk));



console.log(store3.getState()); // {bank: 2000, product: Array(0)}

store3.dispatch(AddProduct({id: 1 , title: 'product-1' }));

store3.subscribe (() => {
 console.log('current state', store.getState())
});

console.log(store3.getState()); //{bank: 2000, product: Array(1)}bank: 2000product: Array(1)0: id: 1title: "product-1"

// console.log(store3.dispatch(FetchgetProduct())); // (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

store5.dispatch(AddProduct({id: 1 , title: 'product-1' }));
console.log(store5.getState());

console.log(store5.dispatch(FetchgetProduct())); // (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

// console.log(store4.dispatch(fetchProduct_one()));

console.log(ReduxThunk);

console.log(store5.getState());

let amount_value = document.querySelector('#value');

amount_value.innerHTML = store5.getState().bank;

let input_amount = document.querySelector('#amount');

document.querySelector('#withdrow').addEventListener('click', () =>{
    store5.dispatch(withdraw(+input_amount.value));
})

document.querySelector('#Deposite').addEventListener('click', () =>{
  store5.dispatch(deposit(+input_amount.value));
})

console.log(store5.getState());

store5.subscribe (() => {
  console.log('current state', store5.getState());
  amount_value.innerHTML = store5.getState().bank;
 });

