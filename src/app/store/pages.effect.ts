import {Injectable} from "@angular/core";
import { Actions,createEffect,ofType } from "@ngrx/effects";
import {select,Store} from '@ngrx/store';
import {catchError, EMPTY,exhaustMap,map,mergeMap,withLatestFrom} from 'rxjs';
import { PagesService } from "../pages/pages.service";
import { selectPages } from "./pages.selector";
import {invokePagesAPI,pagesFetchAPISuccess,singleProductAPISuccess,invokeSingleProductPI} from './pages.action';

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
    exhaustMap((action) => this.pagesService.getSingleProduct(action[0])
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
  
  //   loadAllPages$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(invokePagesAPI),
  //     withLatestFrom(this.store.pipe(select(selectPages))),
  //     mergeMap(([, pageformStore]) => {
  //       // if (pageformStore.length > 0) {
  //       //   return EMPTY;
  //       // }
  //       return this.pagesService
  //         .get()
  //         .pipe(map((data) => pagesFetchAPISuccess({ allPages: data })));
  //     })
  //   )
  // );

  
   /*
   (Line: 2) Injected the 'Actions' service that loads from the 
  '@ngrx/effects'

(Line: 3) The 'Store'(our 'Pages' store) injected that loads from 
the '@ngrx/store'

(Line: 17) The 'createEffect()' that loads from the '@ngrx/effects'
 helps to create the ngrx effects.

(Line: 19) The 'ofType' loads from the '@ngrx/effects'. 
It takes action(eg: invokePagesAPI) as input parameter. 
It allows the execution-only the action that registered with got invoked.

(Line: 20) The 'withLatestFrom' loads from the 'rxjs'. 
It outputs the latest result of an observable. 
Here 'this.store.pipe(select(selectPages))' trying to 
fetch the data from the store if already exist.

(Line: 21) The 'mergeMap' loads from the 'rxjs'.
Here are 2 input parameters we are reading inside of the 'mergeMap'. 
The first input parameter is undefined because 'ofType'
observable has a void action method and the second input 
parameter comes from the 'withLatesFrom'.

(Line: 22-24) If the data already exists in the ngrx store, 
then return 'EMTY' observable.

(Line: 25-27) If the data do not already exist, 
then invoke the API call, on receiving a successful 
response save it store by calling the 'pageFetchAPISuccess'(action).
*/
}
