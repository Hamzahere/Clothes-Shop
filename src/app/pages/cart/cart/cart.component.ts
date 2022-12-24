import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokePagesAPI } from '../../store/pages.action';
import { selectPages } from '../../store/pages.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private store:Store) { }

  pages$ = this.store.pipe(select(selectPages));

  ngOnInit(): void {
    this.store.dispatch(invokePagesAPI())
  }
  
  /*

(Line: 12) Inject the 'Store' loads from the '@ngrx/store'.
(Line: 13) Declared the 'pages$' observable that listens for 
the changes from the store. Here we use 'selectPages' 
selector to fetch all the data from the store.
(Line: 16) Here invoking the 'invokePagesAPI' 
action method which will invoke ngrx effect that invokes an API call.

*/

}
