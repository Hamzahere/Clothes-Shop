import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {removeFromCart ,checkout} from '../../../store/pages.action';
import { selectPages } from '../../../store/pages.selector';
import { CartProducts } from 'src/app/types/type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,AfterViewInit {
  myForm: FormGroup;
     cartObj: any;
     cartProducts : Array<CartProducts> = [];
     cartItems:Array<any>=[];
     total:number = 0;
  success: boolean = false;
     //checkoutSuccess$: Observable<boolean>;

     displayStyle = "none";
  checkoutMsg: any;
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  constructor(private store:Store,private fb: FormBuilder,private router: Router) { 
    this.myForm = this.fb.group({
      name_on_card: ['', Validators.required],
      card_number: ['', [Validators.required]],
      expiry_date: ['', Validators.required],
      csv: ['', Validators.required],
    });
  }
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
    

    let subscription_new = this.pages$.subscribe((x) => {
      //let obj = {...x[0]};
      console.log(x);
       this.cartItems = x['CartItem'];
      this.cartProducts = this.cartItems;
      console.log(this.cartItems);
      
//totalling the sum for the cart 
      this.cartItems.forEach((item) => {
        this.total += item.price * item.quantity;
      });
      return x;
    });
    let checkout_success = this.pages$.subscribe((currentState) => {
      //let obj = {...x[0]};
      console.log(currentState);
       this.checkoutMsg = currentState['success'];
      if(this.checkoutMsg === true){
        this.openPopup();
        setTimeout(()=>{

          this.router.navigate(['/']);
        },3000)
      }
      console.log(this.cartItems);
      
      //return x;
    });
  }

  removeFromCart(singleProduct:any){
    this.total = 0;
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

  onSubmit(){
console.log('asas');
console.log(this.myForm.value);
this.checkoutOrder()

  }

  checkoutOrder(){

    let items:Array<{name,price}> = [];
    this.cartItems.forEach(item => items.push({name:item['name'],price:item['price']}));
    console.log(items);
    //let total = this.total;
    

    console.log(this.total);
    let checkoutObject = {
      items,
      total:this.total
    }

    console.log(checkoutObject);
    
    this.store.dispatch(checkout(checkoutObject))
  }


}
