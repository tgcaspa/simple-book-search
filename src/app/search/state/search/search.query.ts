import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { SearchState } from './search.model';
import { SearchStore } from './search.store';

@Injectable({ providedIn: 'root' })
export class SearchQuery extends Query<SearchState> {
  maxResults$: Observable<number> = this.select('maxResults');
  startIndex$: Observable<number> = this.select('startIndex');

  constructor(protected store: SearchStore) {
    super(store);
  }
}
