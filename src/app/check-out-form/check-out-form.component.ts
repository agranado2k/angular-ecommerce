import { OrderService } from './../order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order';

@Component({
  selector: 'check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent implements OnInit, OnDestroy {
  @Input('shopping-cart') cart: ShoppingCart;
  userId: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {}

  async ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder(shipping) {
    let order = new Order(this.userId, shipping, this.cart);
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }
}
