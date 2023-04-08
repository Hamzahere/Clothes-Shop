import { Component, OnInit } from '@angular/core';
import { addToCart,invokePagesAPI,invokeSingleProductPI} from '../store/pages.action';
import {selectPages} from '../store/pages.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store:Store,private router: Router) { }
  homeTest$ = this.store.pipe(select(selectPages));
  newArrivalProducts:any
  //movies$: Observable<any> = this.store.select(state => state);
  cartItem = {
    item : {
      price:3,
      name:"test",
      quantity:1
    }}

  ngOnInit(): void {
    this.store.dispatch(invokePagesAPI());
    
    console.log(this.homeTest$);
    // this.movies$.subscribe((x)=>{
    //   console.log(x);
      
    // })
    let subscription_new = this.homeTest$.subscribe((x) => {
      //let obj = {...x[0]};
      this.newArrivalProducts = x['NewArrival'][0];
      console.log(x);
      return x;
    });
  }

  

  addToCart(singleProduct:any){
    console.log(singleProduct);
    
    let cartItem = {
      item:{
        price:singleProduct.price,
        name:singleProduct.name,
        quantity:1,
        imageUrl:singleProduct.image
      }
    }
    this.store.dispatch(addToCart(cartItem))
  }

  fetchSingleProdDetails(singleProduct:any){
console.log(singleProduct);
let stingId = String(singleProduct.id);
this.store.dispatch(invokeSingleProductPI(stingId));
this.router.navigate(['/page/product-detail']);
//routerLink = "/page/product-detail"
  }

  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

}
