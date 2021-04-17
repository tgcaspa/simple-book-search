import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { WishlistCommonModule } from '../wishlist/wishlist/wishlist.module';
import { VolumeInfoCardComponent } from './components/volume-info-card/volume-info-card.component';
import { VolumeInfoModalComponent } from './components/volume-info-modal/volume-info-modal.component';

@NgModule({
  declarations: [
    VolumeInfoCardComponent,
    VolumeInfoModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    WishlistCommonModule
  ],
  exports: [
    VolumeInfoCardComponent,
    VolumeInfoModalComponent
  ]
})
export class BooksModule { }
