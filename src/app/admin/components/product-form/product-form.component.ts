import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) productService.get(this.id).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.save(product);

    this.router.navigateByUrl('/admin/products');
  }

  delete() {
    if (!confirm('Are you sure that you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigateByUrl('/admin/products');
  }
}
