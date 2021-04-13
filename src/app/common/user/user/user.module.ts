import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotEmptyUsernameValidatorDirective } from '../forms/not-empty.directive';

@NgModule({
  declarations: [
    NotEmptyUsernameValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NotEmptyUsernameValidatorDirective
  ]
})
export class UserModule { }
