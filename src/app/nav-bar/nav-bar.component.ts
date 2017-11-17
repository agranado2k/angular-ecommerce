import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService,
    private auth: AuthService) {
    }

  async ngOnInit() {
    this.auth.appUser.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
