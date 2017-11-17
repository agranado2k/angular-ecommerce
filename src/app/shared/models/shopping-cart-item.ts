import { Product } from './product';

export class ShoppingCartItem {
  key: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(item: Partial<ShoppingCartItem>) {
    Object.assign(this, item);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
