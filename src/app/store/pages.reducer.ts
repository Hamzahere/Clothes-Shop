import { createReducer, on } from '@ngrx/store';
import { State } from './pages';
 import { pagesFetchAPISuccess } from './pages.action';
import { addToCart } from './pages.action';
 
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
  on(addToCart, (state, { item }) => {
    console.log("item",item);
    
    let oldState = {...state};
    let oldStateCarts:Array<any> = oldState['CartItem'];
    console.log("oldStateCarts",oldStateCarts);
   let newState;
    if(oldStateCarts == undefined){
       newState = {...state,CartItem :[item]};
    }
    else{
      let index = oldStateCarts.findIndex(elem => elem.name == item.name);
      console.log(oldStateCarts[index]);

      if(oldStateCarts[index] !== undefined){

        const newArray = JSON.parse(JSON.stringify(oldStateCarts)); //making a new array
        newArray[index].quantity += 1;
        newState = {...state,CartItem :newArray};
      }
      else{
        newState = {...state,CartItem :[...oldStateCarts,item]};
      }
    }
    
    return newState;
  }),
);

/*
(Line: 9-10)In reducer to register action, 
we have to use 'on' that loads from the '@ngrx/store'.
 Here 'on' has an arrow function as the second parameter. 
 The arrow function contains 2 parameters, first, 
 the param is the existing store state, and the second param is 
the action(eg: pagesFetchAPISuccess) payload(API payload)
*/

