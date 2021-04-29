import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { UserQuery } from '../../user/state/user.query';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private userQuery: UserQuery) { }

  canActivate(): Observable<boolean> {
    const isUserLoggedIn$ = this.userQuery.isUserLoggedIn$();
    return isUserLoggedIn$.pipe(
        switchMap(isUserLoggedIn => {
          if (!isUserLoggedIn) {
            // Logout if no user logged in.
            return this.authService.logout().pipe(
              // Can't activate.
              map(() => false)
            );
          }
          // Can activate.
          return of(true);
        })
      );
  }

}
