import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
// import { invokePagesAPI } from '../../store/pages.action';
import { addToCart } from '../../store/pages.action';
import {map} from 'rxjs';
import {pipe} from 'rxjs'
import { selectPages } from '../../store/pages.selector';
import { CartProducts } from 'src/app/types/type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // cartObj: { CartItem: { price: number; name: string; quantity: number; }; };
     cartObj: any;
     cartProducts : Array<CartProducts> = [{name:"juice",price:20,imageUrl:"assets/images/111.jpg",quantity:2},

     {name:"chips",price:30,imageUrl:"assets/images/111.jpg",quantity:2},{name:"meat",price:40,imageUrl:"assets/images/111.jpg",quantity:1}]


  constructor(private store:Store) { }

  cartItem = {
    item : {
      price:3,
      name:"test",
      quantity:1
    }}

    cartItemNew = {
      item : {
        price:4,
        name:"test_new",
        quantity:1
      }}
  
  pages$ = this.store.pipe(select(selectPages));

  

  subscription = this.pages$.subscribe(x => console.log(x[0]));

  subscription_new = this.pages$.subscribe((x) => {
    let obj = {...x[0]};
    console.log(obj);
    this.cartObj = obj;
    return obj;
  });

  ngOnInit(): void {
    this.store.dispatch(addToCart(this.cartItem))
    this.store.dispatch(addToCart(this.cartItemNew))


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
