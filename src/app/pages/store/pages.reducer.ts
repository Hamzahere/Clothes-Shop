import { createReducer, on } from '@ngrx/store';
import { State } from './pages';
// import { pagesFetchAPISuccess } from './pages.action';
import { addToCart } from './pages.action';
 
export const initialState: Array<any> = [];
 
export const pageReducer = createReducer(
  initialState,
  // on(pagesFetchAPISuccess, (state, { allPages }) => {
  //   return allPages;
  // }),
  on(addToCart, (state, { item }) => {
    let newState = [...state];
    newState.unshift(item);
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

