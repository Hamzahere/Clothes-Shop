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

  export const invokeSingleProductPI = createAction(
    '[Single Product API] Invoke Product Fetch API',
    props<any>()
)
export const singleProductAPISuccess = createAction(
    '[Single Product API] Fetch API Success',
    // props<{ allPages: State[] }>()
    props<any>()
  );

  export const addToCart = createAction(
    '[Item Addition ] Adding Item to a cart',
    props<{ item: CartItem }>()
  );

  export const removeFromCart = createAction(
    '[Item Deletion ] Removing Item from cart',
    props<{ item: CartItem }>()
  ); 


  export const checkout = createAction(
    '[Checkout API] Post',
    props<any>()
)
export const checkoutSuccess = createAction(
    '[Checkout API] Post Success',
    // props<{ allPages: State[] }>()
    props<any>()
  );

  export const userLogin = createAction(
    '[Login API] Post',
    props<any>()
)

export const userLoginSuccess = createAction(
  '[Login API] Post Success',
  props<any>()
)

export const userSignUp = createAction(
  '[SignUp API] Post',
  props<any>()
)
export const userSignUpSuccess = createAction(
'[SignUp API] Post Success',
props<any>()
)


export const userOrders = createAction(
  '[userOrders API] Post',
  props<any>()
)

export const userOrdersSuccess = createAction(
  '[userOrders API] Post Success',
  props<any>()
)