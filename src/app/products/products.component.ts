import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
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

  filter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
