import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { ProductComponent } from './product/product/product.component';
import { StoreModule } from '@ngrx/store';
import { pageReducer } from '../store/pages.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffect } from '../store/pages.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';




@NgModule({
  declarations: [
    PagesComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    UserComponent,
    UserOrdersComponent,
    PaymentsuccessComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
        ReactiveFormsModule
    //StoreModule.forFeature('mypages',pageReducer),
   // EffectsModule.forFeature([PagesEffect])
  ]
})
export class PagesModule { }
