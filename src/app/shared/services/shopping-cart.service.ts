import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private afDb: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.get(cartId).map(r => new ShoppingCart(r.items));
  }

  async addToCart(product) {
    this.updateCartQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateCartQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.afDb.object(`/shopping-cart/${cartId}/items`).remove();
  }

  private async updateCartQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe((item: ShoppingCartItem) => {
      let quantity = (item && item.quantity || 0) + change;
      if (quantity === 0 )
        item$.remove();
      else
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.afDb.object(`/shopping-cart/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private create() {
    return this.afDb.list('/shopping-cart').push({
      createdDate: new Date().getTime()
    });
  }

  private get(id) {
    return this.afDb.object(`/shopping-cart/${id}`)
      .snapshotChanges()
      .map(c => ({ key: c.payload.key, ...c.payload.val() }));
  }
}
