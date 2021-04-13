import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModule } from '../common/user/user/user.module';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@NgModule({
  declarations: [
    LayoutHeaderComponent
  ],
  imports: [
    CommonModule,
    UserModule
  ],
  exports: [
    LayoutHeaderComponent
  ]
})
export class LayoutModule { }
