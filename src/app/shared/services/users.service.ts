import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app-user';

@Injectable()
export class UsersService {

  constructor(private afDb: AngularFireDatabase) { }

  create(user: firebase.User) {
    this.afDb.object(`/users/${user.uid}`).update({
      email: user.email,
      name: user.displayName
    });
  }

  getById(id: string): Observable<AppUser> {
    return this.afDb.object(`/users/${id}`).valueChanges();
  }
}
