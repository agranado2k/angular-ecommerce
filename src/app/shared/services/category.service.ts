import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private afDb: AngularFireDatabase) {
  }

  getAll() {
    return this.afDb.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }
}
