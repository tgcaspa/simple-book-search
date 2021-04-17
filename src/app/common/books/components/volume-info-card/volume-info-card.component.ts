import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';

import { BooksStore } from './../../state/books.store';
import { BookItem } from '../../state/book.model';
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

  private modalRef: BsModalRef;
  private modalOptions: ModalOptions = {
    class: 'modal-xl'
  };

  constructor(private modalService: BsModalService,
              private booksStore: BooksStore) {
  }

  showMoreDetails(): void {
    this.booksStore.setActive(this.bookItem.id);

    this.modalRef = this.modalService.show(VolumeInfoModalComponent, this.modalOptions);
    // Destroy modalRef on close.
    this.modalRef.onHidden.pipe(take(1)).subscribe(() => this.modalRef = undefined);
  }
}