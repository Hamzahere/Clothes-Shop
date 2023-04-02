import { Component, OnInit } from '@angular/core';
import {selectPages} from '../../../store/pages.selector';
import { select, Store } from '@ngrx/store';
import { addToCart,invokePagesAPI,invokeSingleProductPI} from '../../../store/pages.action';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  checked = false;
  constructor(private store:Store) { 
  }
  singleProdObservable$ = this.store.pipe(select(selectPages));
  singleProduct:any

  ngOnInit(): void {
    let subscription_new = this.singleProdObservable$.subscribe((x) => {
      //let obj = {...x[0]};
      this.singleProduct = x['singleProduct'];
      console.log(this.singleProduct);
      
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
        imageUrl:"assets/images/111.jpg"
      }
    }
    this.store.dispatch(addToCart(cartItem))
  }

}
