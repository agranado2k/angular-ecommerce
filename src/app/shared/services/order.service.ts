import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private afDb: AngularFireDatabase) { }

  async placeOrder(order) {
    let result = await this.afDb.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
