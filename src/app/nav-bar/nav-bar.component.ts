import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  appUser: AppUser;

  constructor(
    private auth: AuthService) {
      auth.appUser.subscribe(appUser => this.appUser = appUser);
    }

  logout() {
    this.auth.logout();
  }
}
