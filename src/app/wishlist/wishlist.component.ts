import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BookItem, BooksState } from '../common/books/state/book.model';
import { WishlistQuery } from './state/wishlist.query';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books$: Observable<BooksState>;
  disableShowMoreDetails: boolean = true;
  hideFooterActions: boolean = false;

  constructor(private wishlistQuery: WishlistQuery) { }

  ngOnInit(): void {
    this.books$ = this.wishlistQuery.selectAll();
  }

  trackBooksItemsByFn = (bookItem: BookItem): BookItem['id'] => bookItem?.id;
}
