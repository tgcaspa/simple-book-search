import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookItem } from '../../books/state/book.model';
import { BooksQuery } from '../../books/state/books.query';
import { WishlistService } from '../../wishlist/services/wishlist.service';
import { WishlistQuery } from '../../wishlist/state/wishlist.query';

@Component({
  selector: 'app-volume-info-modal',
  templateUrl: './volume-info-modal.component.html',
  styleUrls: ['./volume-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeInfoModalComponent implements OnInit {
  bookItem$: Observable<BookItem>;

  constructor(private modalRef: BsModalRef,
              private booksQuery: BooksQuery,
              private wishlistService: WishlistService,
              private wishlistQuery: WishlistQuery) {
  }

  ngOnInit(): void {
    this.bookItem$ = combineLatest([
      this.booksQuery.selectActive() as Observable<BookItem>,
      this.wishlistQuery.selectAll()
    ]).pipe(
      map(([bookItem, wishlistItems]) => {
        const found = wishlistItems.find(item => item.id === bookItem.id);
        return {...bookItem, isWishlish: !!found};
      })
    )
  }

  close(): void {
    this.modalRef.hide();
  }

  addToWishlist(bookItem: BookItem): void {
    this.wishlistService.add({ ...bookItem, isWishlish: true });
  }
}
