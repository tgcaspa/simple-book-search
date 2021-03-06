import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { BooksState } from '../../books/state/book.model';
import { WishlistStore } from './wishlist.store';

@Injectable({ providedIn: 'root' })
export class WishlistQuery extends QueryEntity<BooksState> {

  constructor(protected store: WishlistStore) {
    super(store);
  }
}
