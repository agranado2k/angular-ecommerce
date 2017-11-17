import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private usersServices: UsersService,
    private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser
      .map(user => user.isAdmin);
  }

}
