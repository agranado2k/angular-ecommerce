import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
import { RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user.map(user => {
      if (user) return true;

      this.router.navigate(['/login'], {queryParams:  {returnUrl: state.url}});

      return false;
    });
  }

}
