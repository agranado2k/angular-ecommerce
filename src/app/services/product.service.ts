import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private afDb: AngularFireDatabase) { }

  save(product) {
    this.afDb.list('/products').push(product);
  }
}
