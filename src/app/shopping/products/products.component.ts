import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ProductService } from '../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService) {
  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
