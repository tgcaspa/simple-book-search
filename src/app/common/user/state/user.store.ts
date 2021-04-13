import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { UserState, createInitialUserState } from './user.model';

export const STORE_NAME_USER = 'user';

@Injectable({providedIn: 'root'})
@StoreConfig({ name: STORE_NAME_USER, resettable: true })
export class UserStore extends Store<UserState> {

  constructor() {
    super(createInitialUserState());
  }
}
