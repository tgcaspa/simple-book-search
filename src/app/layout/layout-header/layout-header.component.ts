import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './../../common/auth/services/auth.service';
import { UserQuery } from './../../common/user/state/user.query';
import { UserState } from './../../common/user/state/user.model';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  username$: Observable<UserState['username']> = this.userQuery.username$;
  isUserLoggedIn$: Observable<boolean> = this.userQuery.isUserLoggedIn$();

  menuItems: Route[] = [];

  constructor(private router: Router,
              private userQuery: UserQuery,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this. menuItems = this.getMenuItems();
  }

  getMenuItems(): Route[] {
    return (this.router.config as any[]).filter(item => !!item.data?.displayInMenu);
  }

  onLogout(): void {
    this.authService.logout().pipe(take(1)).subscribe();
  }
}
