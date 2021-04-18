import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { BookItem } from '../books/state/book.model';
import { SearchQuery } from '../../search/state/search/search.query';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent implements OnInit {
  private _bookItems: BookItem[];

  @Input()
  set bookItems(bookItems: BookItem[]) {
    this._bookItems = bookItems;
  }
  get bookItems(): BookItem[] {
    return this._bookItems;
  }

  maxResults$: Observable<number>;
  totalItems$: Observable<number>;
  currentPage$: Observable<number>;

  disablePagination: boolean;
  disableShowMoreDetails: boolean;
  hideFooterActions: boolean;

  trackBooksItemsByFn = (bookItem: BookItem): BookItem['id'] => bookItem?.id;

  constructor(private searchQuery: SearchQuery) { }

  ngOnInit(): void {
    this.maxResults$ = this.searchQuery.maxResults$;
  }

  pageChanged(event: any): void {
    
  }
}
