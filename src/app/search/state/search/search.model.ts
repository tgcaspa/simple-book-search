export interface SearchState {
  maxResults: number;
  startIndex: number;
}

export const createInitialSearchState = () => ({
  maxResults: 20,
  startIndex: 0
});
