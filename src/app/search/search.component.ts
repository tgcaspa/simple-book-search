import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import { ResultsContainerComponent } from '../common/results-container/results-container.component';
import { BooksQuery } from './../common/books/state/books.query';
import { BooksService } from "../common/books/services/books.service";
import { BookItem, BooksState } from '../common/books/state/book.model';
import { SearchService } from './services/search.service';
import { SearchStore } from './state/search/search.store';
import { SearchQuery } from './state/search/search.query';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild(ResultsContainerComponent, {static: true})
  resultsContainer: ResultsContainerComponent;

  searchBarControl: FormControl;

  books$: Observable<BooksState>;
  isLoading$: Observable<boolean>;

  disableShowMoreDetails: boolean = false;
  hideFooterActions: boolean = true;

  constructor(private searchService: SearchService,
              private searchStore: SearchStore,
              private searchQuery: SearchQuery,
              private booksService: BooksService,
              private booksQuery: BooksQuery) { }

  ngOnInit(): void {
    // Init form.
    this.searchBarControl = new FormControl('', [Validators.required]);
    this.registerControlValueChange();

    this.books$ = this.booksQuery.selectAll();
    this.isLoading$ = this.searchQuery.selectLoading();
  }

  ngOnDestroy(): void {
    // Reset books store from results.
    this.booksService.reset();
  }

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
        .subscribe(bookItems => this.setResults(bookItems));
  }

  private setResults(bookItems: BookItem[]): void {
    if (this.resultsContainer) {
      this.resultsContainer.disableShowMoreDetails = this.disableShowMoreDetails;
      this.resultsContainer.disableShowMoreDetails = this.disableShowMoreDetails;
      this.resultsContainer.hideFooterActions = this.hideFooterActions;
      this.resultsContainer.bookItems = bookItems;
    }
  }
}
