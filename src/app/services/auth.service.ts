import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { AppUser } from '../models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(
    private usersServices: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth) {

    this.user = afAuth.authState;
    this.user.subscribe(user => {
      if (!user) return;

      this.usersServices.create(user);

      const url = this.route.snapshot.queryParamMap.get('returnUrl');
      if (!url) return;

      this.router.navigateByUrl(url);
    });
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser(): Observable<AppUser> {
    return this.user
      .switchMap(user => {
        if (user) return this.usersServices.getById(user.uid);

        return Observable.of(null);
      });
  }

}
