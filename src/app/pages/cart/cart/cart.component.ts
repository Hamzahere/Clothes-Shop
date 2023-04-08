import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {removeFromCart } from '../../../store/pages.action';
import { selectPages } from '../../../store/pages.selector';
import { CartProducts } from 'src/app/types/type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,AfterViewInit {
  // cartObj: { CartItem: { price: number; name: string; quantity: number; }; };
     cartObj: any;
     cartProducts : Array<CartProducts> = [{name:"juice",price:20,imageUrl:"assets/images/111.jpg",quantity:2},

     {name:"chips",price:30,imageUrl:"assets/images/111.jpg",quantity:2},{name:"meat",price:40,imageUrl:"assets/images/111.jpg",quantity:1}]


  constructor(private store:Store) { }
  ngAfterViewInit(): void {
  }

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

      cartItemAfterView = {
        item : {
          price:5,
          name:"cartItemAfterView",
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
    // this.store.dispatch(addToCart(this.cartItem))
    // this.store.dispatch(addToCart(this.cartItemNew))
    //this.store.dispatch(invokePagesAPI());

    let subscription_new = this.pages$.subscribe((x) => {
      //let obj = {...x[0]};
      console.log(x);
      let cartItems = x['CartItem'];
      this.cartProducts = cartItems;
      console.log(cartItems);
      
      return x;
    });
  }

  removeFromCart(singleProduct:any){
    console.log(singleProduct);
    
    let cartItem = {
      item:{
        price:singleProduct.price,
        name:singleProduct.name,
        quantity:1,
        imageUrl:singleProduct.image
      }
    }
    this.store.dispatch(removeFromCart(cartItem))
  }


}
