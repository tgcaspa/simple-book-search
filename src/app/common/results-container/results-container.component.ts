import { Component, Input } from '@angular/core';

import { BookItem } from '../books/state/book.model';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent {
  private _bookItems: BookItem[];

  @Input()
  set bookItems(bookItems: BookItem[]) {
    this._bookItems = bookItems;
  }
  get bookItems(): BookItem[] {
    return this._bookItems;
  }

  disableShowMoreDetails: boolean;
  hideFooterActions: boolean;

  trackBooksItemsByFn = (bookItem: BookItem): BookItem['id'] => bookItem?.id;
}
