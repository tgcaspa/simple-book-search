import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { VolumeInfoCardComponent } from './components/volume-info-card/volume-info-card.component';

@NgModule({
  declarations: [
    VolumeInfoCardComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    VolumeInfoCardComponent
  ]
})
export class BooksModule { }
