import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function notEmptyUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): { username: string } | null => {
    return !control.value
      ? { username: `Username value can't be empty.` }
      : null;
  };
}


@Directive({
  selector: '[appNotEmptyUsername]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NotEmptyUsernameValidatorDirective, multi: true }]
})
export class NotEmptyUsernameValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return notEmptyUsernameValidator()(control);
  }
}
