import { persistState } from '@datorama/akita';

import { environment } from 'src/environments/environment';
import { STORE_NAME_USER } from './common/user/state/user.store';

export const APP_STORE_NAME = `${environment.appName}Stores`;

export const registerAppStores = () => persistState({
  key: APP_STORE_NAME,
  storage: sessionStorage,
  include: [
    STORE_NAME_USER
  ]
});