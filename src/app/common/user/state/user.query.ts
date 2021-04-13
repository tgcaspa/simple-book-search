import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserState } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  username$: Observable<UserState['username']> = this.select('username');

  constructor(protected store: UserStore) {
    super(store);
  }

  isUserLoggedIn$(): Observable<boolean> {
    return this.username$.pipe(
      map(username => !!username)
    );
  }
}
