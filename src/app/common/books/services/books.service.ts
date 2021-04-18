import { Injectable } from '@angular/core';

import { BookItem } from './../state/book.model';
import { BooksStore } from './../state/books.store';

@Injectable()
export class BooksService {

  constructor(private store: BooksStore) { }

  setActive(bookItem: BookItem): any {
    return this.store.setActive(bookItem.id);
  }

  removeActive(bookItem: BookItem): void {
    return this.store.removeActive(bookItem.id);
  }

  reset(): void {
    return this.store.reset();
  }
}
