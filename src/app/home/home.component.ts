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
  secondNewArrivalProducts: any;
  homeHeadlines: any;

  constructor(private store:Store,private router: Router) { }
  homeTest$ = this.store.pipe(select(selectPages));
  newArrivalProducts:any
  displayStyle = "none";
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
      this.newArrivalProducts = x['NewArrival'][0].filter(prod => prod.category == "newArrival");
      this.secondNewArrivalProducts = x['NewArrival'][0].filter(prod => prod.category == "Second newArrival");
      this.homeHeadlines = x['NewArrival'][0].filter(prod => prod.category == "Home Headlines");
      console.log(this.newArrivalProducts);
      console.log(x);
      return x;
    });
  }

  

  addToCart(singleProduct:any){
    this.openPopup();
    setTimeout(()=>{
      this.closePopup();
    },3000)
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

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  fetchSingleProdDetails(singleProduct:any){
console.log("inside fetchSingleProdDetails");

 let stringId = String(singleProduct.id);
  this.store.dispatch(invokeSingleProductPI(singleProduct.id));
this.router.navigate(['/page/product-detail']);

  }

  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

}
