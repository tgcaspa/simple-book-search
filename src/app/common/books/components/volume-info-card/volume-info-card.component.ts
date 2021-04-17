import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';

import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { BookItem } from '../../state/book.model';
import { BooksService } from '../../services/books.service';
import { VolumeInfoModalComponent } from '../volume-info-modal/volume-info-modal.component';

@Component({
  selector: 'app-volume-info-card',
  templateUrl: './volume-info-card.component.html',
  styleUrls: ['./volume-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeInfoCardComponent {
  @Input()
  bookItem: BookItem;

  @Input()
  disableShowMoreDetails?: boolean;

  @Input()
  hideFooterActions?: boolean;

  private modalRef: BsModalRef;
  private modalOptions: ModalOptions = {
    class: 'modal-xl'
  };

  constructor(private modalService: BsModalService,
              private booksService: BooksService,
              private wishlistService: WishlistService) {
  }

  showMoreDetails(): void {
    if (this.disableShowMoreDetails) {
      return;
    }

    this.booksService.setActive(this.bookItem);

    this.modalRef = this.modalService.show(VolumeInfoModalComponent, this.modalOptions);
    this.modalRef.onHidden.pipe(take(1)).subscribe(() => {
      // Destroy modalRef on close.
      this.modalRef = undefined;
      // Remove active book item.
      this.booksService.removeActive(this.bookItem);
    });
  }

  onRemoveFromWishlist(bookItem: BookItem): void {
    this.wishlistService.remove(bookItem);
  }
}
