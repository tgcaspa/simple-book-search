import { Injectable } from '@angular/core';

import { BookItem } from '../../books/state/book.model';
import { WishlistStore } from '../state/wishlist.store';


@Injectable()
export class WishlistService {

  constructor(private store: WishlistStore) { }

  add(bookItem: BookItem): void {
    return this.store.add({ ...bookItem, isWishlish: true });
  }

  remove(bookItem: BookItem): any {
    return this.store.remove(bookItem.id);
  }

  reset(): void {
    return this.store.reset();
  }
}
