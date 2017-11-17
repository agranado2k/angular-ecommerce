import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../shared/models/shopping-cart';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input('shopping-cart') cart: ShoppingCart;
}
