import { Injectable } from '@angular/core';
import { NgEntityService, NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BooksStore } from '../../common/books/state/books.store';
import { BookItem, BooksState } from '../../common/books/state/book.model';
import { createGetConfig } from '../state/search/search.model';
import { SearchQuery } from '../state/search/search.query';

@NgEntityServiceConfig({
  resourceName: 'volumes'
})
@Injectable()
export class SearchService extends NgEntityService<BooksState> {

  constructor(protected booksStore: BooksStore,
              protected searchQuery: SearchQuery) {
    super(booksStore);
  }

  search(value: string): Observable<BookItem> {
    this.store.setLoading(true);

    return this.get(createGetConfig(value, this.searchQuery.getValue())).pipe(
      finalize(() => this.store.setLoading(false))
    );
  }

  resetStore(): void {
    this.booksStore.reset();
  }
}
