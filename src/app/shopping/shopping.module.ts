import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CheckOutFormComponent } from './check-out-form/check-out-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes = [
  {path: 'products', component: ProductsComponent },
  {path: 'shopping-cart', component: ShoppingCartComponent },

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    OrderSummaryComponent,
    CheckOutFormComponent
  ]
})
export class ShoppingModule { }
