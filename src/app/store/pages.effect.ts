import {Injectable} from "@angular/core";
import { Actions,createEffect,ofType } from "@ngrx/effects";
import {select,Store} from '@ngrx/store';
import {catchError, EMPTY,exhaustMap,map,mergeMap,of,switchMap,withLatestFrom} from 'rxjs';
import {tap} from 'rxjs/operators';
import { PagesService } from "../pages/pages.service";
import { selectPages } from "./pages.selector";
import {invokePagesAPI,pagesFetchAPISuccess,singleProductAPISuccess,invokeSingleProductPI, checkout,checkoutSuccess, userLogin, userLoginSuccess, userOrders, userOrdersSuccess, userSignUp, userSignUpSuccess} from './pages.action';

@Injectable()
export class PagesEffect {
    constructor(
        private actions$:Actions,
        private pagesService:PagesService,
        private store:Store
    ){}


    pagesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(invokePagesAPI),
    exhaustMap(() => this.pagesService.get()
    .pipe(
      map((data) =>{
        console.log("DATA ===>>> ", data)
      return (pagesFetchAPISuccess({ allPages: data }))
    }),
      catchError(()=>EMPTY)
    )
    
    )
  )
  );

  productEffect$ = createEffect(() => this.actions$.pipe(
    ofType(invokeSingleProductPI),
    switchMap((action) => this.pagesService.getSingleProduct(action)
    .pipe(
      map((data) =>{
        console.log("Single Product ===>>> ", data)
      return (singleProductAPISuccess({ allPages: data }))
    }),
      catchError(()=>EMPTY)
    )
    
    )
  )
  );


  checkoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkout),
      exhaustMap(({ data }) =>{
        console.log("data==>",data);
        
        return this.pagesService.checkout(data).pipe(
          map(() => checkoutSuccess({success:true})),
          catchError(()=>EMPTY)
        )
      }
      )
    )
  );


//   loginEffect$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(userLogin),
//     exhaustMap(({ data }) => {
//       console.log('Login data:', data);
//       return this.pagesService.userLogin(data).pipe(
//         map(() => userLoginSuccess({ data })),
//         catchError(() => EMPTY)
//       )
//     })
//   )
// );

loginEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userLogin),
    exhaustMap(({ data }) => {
      console.log('Login data:', data);
      return this.pagesService.userLogin(data).pipe(
        map(response => {
          return userLoginSuccess({ data: response });
        }),
        catchError(() => EMPTY)
      )
    })
  )
);


signUpEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userSignUp),
    exhaustMap(({ data }) => {
      console.log('Login data:', data);
      return this.pagesService.userSignUpAPI(data).pipe(
        map(response => {
          return userSignUpSuccess({ data: { userSignedUp: true } });
        }),
        catchError(() => of(userSignUpSuccess({ data: { userSignedUp: false } })))
      )
    })
  )
);

userOrder$ = createEffect(() =>
this.actions$.pipe(
  ofType(userOrders),
  exhaustMap(({ data }) => {
    console.log('Login data:', data);
    return this.pagesService.userOrder(data).pipe(
      map(response => {
        return userOrdersSuccess({ data:response })}),
      catchError(() => EMPTY)
    )
  })
)
);

}
