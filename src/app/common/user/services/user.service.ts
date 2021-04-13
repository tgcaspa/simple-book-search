import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserState } from '../state/user.model';
import { UserStore } from '../state/user.store';

@Injectable()
export class UserService {

  constructor(private userStore: UserStore) { }

  loadUser(user: UserState): Observable<UserState> {
    this.userStore.update(user);
    return of(user);
  }
}
