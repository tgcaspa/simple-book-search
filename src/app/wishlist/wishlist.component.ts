import { Component, forwardRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OnRemoveFromWishlistActionRef } from '../common/books/models/wishlist-actions';
import { BookItem, BooksState } from '../common/books/state/book.model';
import { WishlistQuery } from './state/wishlist.query';
import { WishlistStore } from './state/wishlist.store';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  providers: [
    { provide: OnRemoveFromWishlistActionRef, useExisting: forwardRef(() => WishlistComponent)}
  ]
})
export class WishlistComponent implements OnInit {
  books$: Observable<BooksState>;
  disableShowMoreDetails: boolean = true;
  hideFooterActions: boolean = false;

  constructor(private wishlistStore: WishlistStore,
              private wishlistQuery: WishlistQuery) { }

  ngOnInit(): void {
    this.books$ = this.wishlistQuery.selectAll();
  }

  trackBooksItemsByFn = (bookItem: BookItem): BookItem['id'] => bookItem?.id;

  removeFromWishlist(bookItem: BookItem): void {
    this.wishlistStore.remove(bookItem.id);
  }
}
