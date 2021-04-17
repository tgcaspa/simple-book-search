import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { WishlistCommonModule } from '../wishlist/wishlist/wishlist.module';
import { ResultsContainerComponent } from './results-container.component';
import { VolumeInfoCardComponent } from './volume-info-card/volume-info-card.component';
import { VolumeInfoModalComponent } from './volume-info-modal/volume-info-modal.component';

@NgModule({
  declarations: [
    ResultsContainerComponent,
    VolumeInfoCardComponent,
    VolumeInfoModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    WishlistCommonModule
  ],
  exports: [
    ResultsContainerComponent,
    VolumeInfoCardComponent,
    VolumeInfoModalComponent
  ]
})
export class ResultsContainerModule { }
