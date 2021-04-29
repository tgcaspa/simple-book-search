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
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['logout']) },
        { provide: UserQuery, useValue: jasmine.createSpyObj('UserQuery', ['isUserLoggedIn$']) },
        AuthGuard
      ]
    });
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userQuerySpy = TestBed.inject(UserQuery) as jasmine.SpyObj<UserQuery>;
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('#canActivate', () => {

    it('should activate if the user is logged in', () => {
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
