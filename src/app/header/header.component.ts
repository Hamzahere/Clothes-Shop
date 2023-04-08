import { Component, OnInit } from '@angular/core';
import { selectPages } from '../store/pages.selector';
import { select, Store } from '@ngrx/store';
import { CartProducts } from 'src/app/types/type';
import { removeFromCart} from '../store/pages.action';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartProducts : Array<CartProducts>
  cartTotal = 0;
  constructor(private store:Store) {
    this.cartProducts = [];
   }

  pages$ = this.store.pipe(select(selectPages));

  ngOnInit(): void {
    let subscription_new = this.pages$.subscribe((x) => {
      //let obj = {...x[0]};
      console.log(x);
      let cartItems = x['CartItem'];
      this.cartProducts = cartItems;
      console.log(cartItems);
      
      cartItems.forEach((cartItem:CartProducts)=>{
        this.cartTotal+=cartItem.price});



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
