import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { BooksState, createInitialBookState } from './book.model';

export const STORE_NAME_BOOKS = 'books';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: STORE_NAME_BOOKS, resettable: true,  })
export class BooksStore extends EntityStore<BooksState> {

  constructor() {
    super(createInitialBookState());
  }
}
