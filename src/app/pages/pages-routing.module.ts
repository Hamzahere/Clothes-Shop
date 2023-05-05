import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import {ProductComponent} from './product/product/product.component';
import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  { path: '', component: PagesComponent },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'product-detail',
    component: ProductComponent,
  },
  {
    path:'user',
    component:UserComponent
  },
  {
    path:'user-orders',
    component:UserOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
