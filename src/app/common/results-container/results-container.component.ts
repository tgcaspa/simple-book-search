import { Component, Input, OnInit, Optional } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from "rxjs";

import { BookItem } from '../books/state/book.model';

export abstract class SearchComponentRef {
  abstract pageChanged(event: PageChangedEvent): void;
}

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
  currentPage: number;

  rotate: boolean = true;
  disablePagination: boolean;
  disableShowMoreDetails: boolean;
  hideFooterActions: boolean;

  trackBooksItemsByFn = (bookItem: BookItem): BookItem['id'] => bookItem?.id;

  constructor(@Optional() private searchComponentRef: SearchComponentRef) { }

  ngOnInit(): void {
    this.currentPage = 1;
  }

  pageChanged(event: PageChangedEvent): void {
    if (this.disablePagination || !this.searchComponentRef) {
      return;
    }
    this.searchComponentRef.pageChanged(event);
  }
}
