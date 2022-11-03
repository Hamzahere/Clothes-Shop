import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { ProductComponent } from './product/product/product.component';


@NgModule({
  declarations: [
    PagesComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
