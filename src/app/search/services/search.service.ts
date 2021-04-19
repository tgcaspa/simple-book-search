import { Injectable } from '@angular/core';
import { NgEntityService, NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { BookItem, BooksState, BooksVolumesResponse, extractBookEntities } from '../../common/books/state/book.model';
import { BooksStore } from '../../common/books/state/books.store';
import { BooksQuery } from '../../common/books/state/books.query';
import { createGetConfig } from '../state/search/search.model';
import { SearchState } from './../state/search/search.model';
import { SearchStore } from './../state/search/search.store';
import { SearchQuery } from '../state/search/search.query';

@NgEntityServiceConfig({
  resourceName: 'volumes'
})
@Injectable()
export class SearchService extends NgEntityService<BooksState> {

  constructor(protected booksStore: BooksStore,
              protected booksQuery: BooksQuery,
              protected searchStore: SearchStore,
              protected searchQuery: SearchQuery) {
    super(booksStore);
  }

  search(value: string): Observable<BookItem[]> {
    // If no value- set empty entities.
    if (!value) {
      this.resetSearchStore();
      return this.setEmptyEntities();
    }
    // Start search process.
    this.store.setLoading(true);

    return this.get(createGetConfig(value, this.searchQuery.getValue())).pipe(
      tap((response: BooksVolumesResponse) => this.setTotalItems(response)),
      map(extractBookEntities),
      tap((items: BookItem[]) => this.booksStore.set(items)),
      finalize(() => this.store.setLoading(false))
    );
  }

  resetSearchStore(): void {
    return this.searchStore.reset();
  }

  updateSearchStore(state: Partial<SearchState>): void {
    this.searchStore.update(state);
  }

  setLoading(loading: boolean): void {
    this.searchStore.setLoading(loading);
  }

  protected setEmptyEntities(): Observable<BookItem[]> {
    this.store.set({});
    return this.booksQuery.selectAll();
  }

  protected setTotalItems(response: BooksVolumesResponse): void {
    this.updateSearchStore({ totalItems: response?.totalItems });
  }
}
