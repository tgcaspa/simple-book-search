import { Injectable } from '@angular/core';
import { NgEntityService, NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BookItem, BooksState } from '../../common/books/state/book.model';
import { BooksStore } from '../../common/books/state/books.store';
import { BooksQuery } from '../../common/books/state/books.query';
import { createGetConfig } from '../state/search/search.model';
import { SearchQuery } from '../state/search/search.query';

@NgEntityServiceConfig({
  resourceName: 'volumes'
})
@Injectable()
export class SearchService extends NgEntityService<BooksState> {

  constructor(protected booksStore: BooksStore,
              protected booksQuery: BooksQuery,
              protected searchQuery: SearchQuery) {
    super(booksStore);
  }

  search(value: string): Observable<BookItem[]> {
    // If no value- set empty entities.
    if (!value) {
      return this.setEmptyEntities();
    }
    // Start search process.
    this.store.setLoading(true);

    return this.get(createGetConfig(value, this.searchQuery.getValue())).pipe(
      finalize(() => this.store.setLoading(false))
    );
  }

  protected setEmptyEntities(): Observable<BookItem[]> {
    this.store.set({});
    return this.booksQuery.selectAll();
  }
}
