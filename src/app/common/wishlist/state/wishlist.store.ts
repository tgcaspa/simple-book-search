import { Injectable } from '@angular/core';
import { EntityState, StoreConfig } from '@datorama/akita';

import { BooksState } from '../../books/state/book.model';
import { BooksStore } from '../../books/state/books.store';

export interface WishlistState extends EntityState<BooksState, BooksState['id']> {}

export const STORE_NAME_WISHLIST = 'wishlist';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: STORE_NAME_WISHLIST })
export class WishlistStore extends BooksStore {

}
