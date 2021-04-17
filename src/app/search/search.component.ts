import { SearchStore } from './state/search/search.store';
import { SearchQuery } from './state/search/search.query';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, finalize, tap } from 'rxjs/operators';

import { BooksQuery } from './../common/books/state/books.query';
import { BookItem, BooksState } from '../common/books/state/book.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchBarControl: FormControl;

  books$: Observable<BooksState>;
  isLoading$: Observable<boolean>;

  hideFooterActions: boolean = true;

  constructor(private searchService: SearchService,
              private searchStore: SearchStore,
              private searchQuery: SearchQuery,
              private booksQuery: BooksQuery) { }

  ngOnInit(): void {
    // Init form.
    this.searchBarControl = new FormControl('', [Validators.required]);
    this.registerControlValueChange();

    this.books$ = this.booksQuery.selectAll();
    this.isLoading$ = this.searchQuery.selectLoading();
  }

  ngOnDestroy(): void {
    // Destroy subscriptions.
  }

  trackBooksItemsByFn = (bookItem: BookItem): BookItem['id'] => bookItem?.id;

  protected registerControlValueChange(): void {
    this.searchBarControl
        .valueChanges
        .pipe(
          tap(() => this.searchStore.setLoading(true)),
          debounceTime(250),
          switchMap(value => this.searchService.search(value)),
          tap(() => this.searchStore.setLoading(false)),
          untilDestroyed(this),
        )
        .subscribe();
  }

}
