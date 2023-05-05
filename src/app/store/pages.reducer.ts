import { createReducer, on } from '@ngrx/store';
import { State } from './pages';
 import { pagesFetchAPISuccess,singleProductAPISuccess,checkoutSuccess, 
  userLoginSuccess, userOrdersSuccess,userSignUpSuccess } from './pages.action';
import { addToCart,removeFromCart } from './pages.action';
 
export const initialState: Array<State> = [
  // {
  // CartItem:[{price:0,name:"",quantity:0}],
  // NewArrival:[{id:0,image:"",name:"",price:0,sale:false}]}
];
 
export const pageReducer = createReducer(
  initialState,
  on(pagesFetchAPISuccess, (state, { allPages }) => {
    let oldState = state;
    //oldState = {...state,NewArrival:allPages}
    let newState = {...state,NewArrival:[allPages]}
    return newState;
  
  // ...state,
  // NewArrival:allPages
  }),

  //singleProduct
  on(singleProductAPISuccess, (state, { allPages }) => {
    let oldState = state;
    //oldState = {...state,NewArrival:allPages}
    let newState = {...state,singleProduct:allPages}
    return newState;
  
  // ...state,
  // NewArrival:allPages
  }),

on(addToCart, (state, { item }) => {
    console.log("item",item);
    
    let oldState = {...state};
    let oldStateCarts:Array<any> = oldState['CartItem'];
    console.log("oldStateCarts",oldStateCarts);
   let newState;
    if(oldStateCarts == undefined){
       newState = {...state,CartItem :[item],success: false};
    }
    else{
      let index = oldStateCarts.findIndex(elem => elem.name == item.name);
      console.log(oldStateCarts[index]);

      if(oldStateCarts[index] !== undefined){

        const newArray = JSON.parse(JSON.stringify(oldStateCarts)); //making a new array
        newArray[index].quantity += 1;
        newState = {...state,CartItem :newArray,success: false,};
      }
      else{
        newState = {...state,CartItem :[...oldStateCarts,item],success: false,};
      }
    }
    
    return newState;
  }),


  on(removeFromCart, (state, { item }) => {
    console.log("item",item);
    
    let oldState = {...state};
    let oldStateCarts:Array<any> = oldState['CartItem'];
    console.log("oldStateCarts",oldStateCarts);
   let newState;
    
      let index = oldStateCarts.findIndex(elem => elem.name == item.name);
      console.log(oldStateCarts[index]);

      //if(oldStateCarts[index] !== undefined){

        const newArray = JSON.parse(JSON.stringify(oldStateCarts)); //making a new array
        if(newArray[index].quantity > 1){

          newArray[index].quantity -= 1;
        }
        else{
          newArray.splice(index, 1);
        }
        newState = {...state,CartItem :newArray};
      //}
    
    
    return newState;
  }),

  on(checkoutSuccess, (state) => {
    return {
      ...state,
      CartItem: [], // clear the CartItem array
      success: true,
    };
  }),

  on(userLoginSuccess, (state, { data }) => ({ ...state, User:data,userLoggedIn:true })),
  on(userOrdersSuccess, (state, { data }) => ({ ...state, UserOrders:data })),
  on(userSignUpSuccess, (state, { data }) => ({ ...state, UserSignedUp:data }))

);



























/*
(Line: 9-10)In reducer to register action, 
we have to use 'on' that loads from the '@ngrx/store'.
 Here 'on' has an arrow function as the second parameter. 
 The arrow function contains 2 parameters, first, 
 the param is the existing store state, and the second param is 
the action(eg: pagesFetchAPISuccess) payload(API payload)
*/

