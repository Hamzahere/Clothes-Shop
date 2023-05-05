import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectPages } from '../../store/pages.selector';
import { userOrders } from 'src/app/store/pages.action';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit, OnDestroy  {
  orders: any[] = []
  pages$ = this.store.pipe(select(selectPages));
  loggedInUser: any;
  loggedInUserId: any;
  loggedInUserSubscription: any;
  ordersSubscription: any;


  constructor(private store:Store) {}

  ngOnInit() {
    this.loggedInUserSubscription  = this.pages$.subscribe((currentState) => {
      //let obj = {...x[0]};
      console.log(currentState);
       this.loggedInUser = currentState['User'];
       this.loggedInUserId = currentState['User']['user']['_id'];

       this.store.dispatch(userOrders({ data: this.loggedInUserId }));

    });
    console.log("this.loggedInUser==>",this.loggedInUserId);
    

    this.ordersSubscription = this.pages$.subscribe((currentState) => {
      //let obj = {...x[0]};
      console.log(currentState);
       this.orders = currentState['UserOrders'];
       console.log("userOrders",this.orders);
    });
   
  }

  ngOnDestroy() {
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }
    
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }
}
