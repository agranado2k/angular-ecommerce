import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: {[productId: string]: ShoppingCartItem} = {}) {
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({key: productId, ...item}));
    }
  }

  itemQuantity(productId) {
    const item = this.itemsMap[productId];
    return (item ? item.quantity : 0);
  }

  get totalPrice() {
    let sum = 0;
    for (let index in this.items)
      sum += this.items[index].totalPrice;

    return sum;
  }

  get itemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;

    return count;
  }
}
