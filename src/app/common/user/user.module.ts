import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotEmptyUsernameValidatorDirective } from './forms/not-empty.directive';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    NotEmptyUsernameValidatorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NotEmptyUsernameValidatorDirective
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
