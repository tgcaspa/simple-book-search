import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './../../common/auth/services/auth.service';
import { UserQuery } from './../../common/user/state/user.query';
import { UserState } from './../../common/user/state/user.state';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {
  username$: Observable<UserState['username']> = this.userQuery.username$;
  isUserLoggedIn$: Observable<boolean> = this.userQuery.isUserLoggedIn$();

  constructor(private userQuery: UserQuery,
              private authService: AuthService) { }

  onLogout(): void {
    this.authService.logout().pipe(take(1)).subscribe();
  }
}
