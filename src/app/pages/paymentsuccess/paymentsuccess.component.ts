import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css'],
})
export class PaymentsuccessComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['/']);
    // }, 3000);
  }
}
