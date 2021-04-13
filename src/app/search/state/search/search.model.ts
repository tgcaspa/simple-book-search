import { HttpGetConfig } from "@datorama/akita-ng-entity-service";

import { extractBookEntities } from "src/app/common/books/state/book.model";

export interface SearchState {
  maxResults: number;
  startIndex: number;
}

export const createInitialSearchState = () => ({
  maxResults: 20,
  startIndex: 0
});

export const createQueryValue = (value: string): string => {
  // Glue spaces.
  value = value.replace(/\s+/mgi, '+');

  return value;
}


export const createGetConfig = (value: string, { startIndex, maxResults }): HttpGetConfig => ({
  params: {
    q: createQueryValue(value),
    startIndex: String(startIndex),
    maxResults: String(maxResults)
  },
  mapResponseFn: extractBookEntities
})
