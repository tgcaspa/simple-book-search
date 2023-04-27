import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RatingModule } from 'ngx-bootstrap/rating';

import { WishlistCommonModule } from '../wishlist/wishlist/wishlist.module';
import { ResultsContainerComponent } from './results-container.component';
import { VolumeInfoCardComponent } from './volume-info-card/volume-info-card.component';
import { VolumeInfoModalComponent } from './volume-info-modal/volume-info-modal.component';

@NgModule({
  declarations: [
    ResultsContainerComponent,
    VolumeInfoCardComponent,
    VolumeInfoModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    WishlistCommonModule,
    RatingModule,
  ],
  exports: [
    ResultsContainerComponent,
    VolumeInfoCardComponent,
    VolumeInfoModalComponent
  ]
})
export class ResultsContainerModule { }
