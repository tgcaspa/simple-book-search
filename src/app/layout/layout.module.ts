import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../common/auth/auth.module';
import { UserModule } from '../common/user/user.module';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@NgModule({
  declarations: [
    LayoutHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    UserModule
  ],
  exports: [
    LayoutHeaderComponent
  ]
})
export class LayoutModule { }
