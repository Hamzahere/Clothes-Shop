import { createAction,props } from "@ngrx/store";
import { State } from "./pages";
import {CartItem} from './pages';



export const invokePagesAPI = createAction(
    '[Pages API] Invoke Pages Fetch API'
)
export const pagesFetchAPISuccess = createAction(
    '[Pages API] Fetch API Success',
    // props<{ allPages: State[] }>()
    props<any>()
  );

  export const addToCart = createAction(
    '[Item Addition ] Adding Item to a cart',
    props<{ item: CartItem }>()
  );