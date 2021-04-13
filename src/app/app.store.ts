import { persistState } from '@datorama/akita';

import { environment } from 'src/environments/environment';

export const APP_STORE_NAME = `${environment.appName}Stores`;

export const registerAppStores = () => persistState({
  key: APP_STORE_NAME,
  storage: sessionStorage,
  include: []
});
