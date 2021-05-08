import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserQuery } from '../../user/state/user.query';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userQuerySpy: jasmine.SpyObj<UserQuery>;
  let authGuard: AuthGuard;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'])
    userQuerySpy = jasmine.createSpyObj('UserQuery', ['isUserLoggedIn$'])

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserQuery, useValue: userQuerySpy },
        AuthGuard
      ]
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('#canActivate', () => {

    it('should activate if the user is logged in', () => {
      authServiceSpy.logout.and.returnValue(of(true));
      userQuerySpy.isUserLoggedIn$.and.returnValue(of(true));

      authGuard.canActivate().subscribe(
        (result: boolean) => {
          expect(result).toBeTruthy();

          expect(authServiceSpy.logout).toHaveBeenCalledTimes(0);
        },
        fail
      );
    });

    it('should not activate if the user is not logged in', () => {
      authServiceSpy.logout.and.returnValue(of(true));
      userQuerySpy.isUserLoggedIn$.and.returnValue(of(false));

      authGuard.canActivate().subscribe(
        (result: boolean) => {
          expect(result).toBeFalsy();

          expect(authServiceSpy.logout).toHaveBeenCalledTimes(1);
        },
        fail
      );
    });
  });
});
