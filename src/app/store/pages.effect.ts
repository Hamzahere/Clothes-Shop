import {Injectable} from "@angular/core";
import { Actions,createEffect,ofType } from "@ngrx/effects";
import {select,Store} from '@ngrx/store';
import {catchError, EMPTY,exhaustMap,map,mergeMap,switchMap,withLatestFrom} from 'rxjs';
import { PagesService } from "../pages/pages.service";
import { selectPages } from "./pages.selector";
import {invokePagesAPI,pagesFetchAPISuccess,singleProductAPISuccess,invokeSingleProductPI, checkout,checkoutSuccess} from './pages.action';

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
      exhaustMap(({ data }) =>
        this.pagesService.checkout(data).pipe(
          map(() => checkoutSuccess({success:true})),
          catchError(()=>EMPTY)
        )
      )
    )
  );

}
