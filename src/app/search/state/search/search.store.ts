import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { createInitialSearchState, SearchState } from './search.model';

export const STORE_NAME_SEARCH = 'search';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: STORE_NAME_SEARCH, resettable: true })
export class SearchStore extends Store<SearchState> {

  constructor() {
    super(createInitialSearchState());
  }
}
