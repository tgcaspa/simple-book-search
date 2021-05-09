import { FormControl } from '@angular/forms';

import { NotEmptyUsernameValidatorDirective } from './not-empty.directive';

describe('NotEmptyUsernameValidatorDirective', () => {
  const directive = new NotEmptyUsernameValidatorDirective();

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  describe('#validate', () => {

    it('should return the error object - if invalid', () => {
      const usernameControl = new FormControl('');

      const result = directive.validate(usernameControl);

      expect(result).toEqual({ username: `Username value can't be empty.` });
    });

    it('should return null - if valid', () => {
      const usernameControl = new FormControl('Dmitry Hershkovich');

      const result = directive.validate(usernameControl);

      expect(result).toBeNull();
    });
  });
});
