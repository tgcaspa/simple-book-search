import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ResultsContainerComponent } from '../common/results-container/results-container.component';
import { BookItem, BooksState } from '../common/books/state/book.model';
import { WishlistQuery } from '../common/wishlist/state/wishlist.query';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  @ViewChild(ResultsContainerComponent, { static: true })
  resultsContainer: ResultsContainerComponent;

  books$: Observable<BooksState>;
  disableShowMoreDetails: boolean = true;
  hideFooterActions: boolean = false;

  constructor(private wishlistQuery: WishlistQuery) { }

  ngOnInit(): void {
    this.books$ = this.wishlistQuery.selectAll().pipe(
      tap((bookItems: BookItem[]) => this.setResults(bookItems))
    );
  }

  private setResults(bookItems: BookItem[]): void {
    if (this.resultsContainer) {
      this.resultsContainer.disableShowMoreDetails = this.disableShowMoreDetails;
      this.resultsContainer.hideFooterActions = this.hideFooterActions;
      this.resultsContainer.bookItems = bookItems;
    }
  }
}
