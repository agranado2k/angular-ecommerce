import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private afDb: AngularFireDatabase) { }

  save(product) {
    this.afDb.list('/products').push(product);
  }

  getAll() {
    return this.afDb.list('/products')
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }
}
