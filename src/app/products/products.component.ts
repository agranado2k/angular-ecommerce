import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart;
  subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    route: ActivatedRoute,
    productService: ProductService) {

    productService.getAll()
    .switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.filter();
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
