import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { UserModule } from '../common/user/user.module';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@NgModule({
  declarations: [
    LayoutHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    UserModule
  ],
  exports: [
    LayoutHeaderComponent
  ]
})
export class LayoutModule { }
