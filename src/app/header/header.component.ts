import { Component, OnDestroy, OnInit } from '@angular/core';
import { selectPages } from '../store/pages.selector';
import { select, Store } from '@ngrx/store';
import { CartProducts } from 'src/app/types/type';
import { removeFromCart} from '../store/pages.action';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  cartProducts : Array<CartProducts>
  cartTotal = 0;
  subscription_new: any;
  loggedInUser: any;
  userEmail: any;
  constructor(private store:Store) {
    this.cartProducts = [];
   }

  pages$ = this.store.pipe(select(selectPages));

  ngOnInit(): void {
    this.subscription_new = this.pages$.subscribe((currentState) => {
      //let obj = {...currentState[0]};
      console.log("header COmpoents state subscription",currentState);
      let cartItems = currentState['CartItem'];
      this.loggedInUser = currentState['User'];
      this.userEmail = this.loggedInUser?.['user']?.email;
      console.log("this.loggedInUser",this.loggedInUser);
      
      this.cartProducts = cartItems;
      console.log(cartItems);
      
      cartItems.forEach((cartItem:CartProducts)=>{
        this.cartTotal+=cartItem.price});



      return currentState;
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

  ngOnDestroy(){
if(this.subscription_new){
  this.subscription_new.unsubscribe();
}
  }

}
