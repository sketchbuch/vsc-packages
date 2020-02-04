import { NpmSearchResults } from './npm';

export type SearchData = {};
export type SearchSortDefault = 'optimal';
export type SearchSort = 'maintenance' | SearchSortDefault | 'popularity' | 'quality';

export interface SearchState {
  data?: NpmSearchResults;
  error?: Error;
  loading: boolean;
  sort: SearchSort;
  term: string;
}

export interface SearchPmPayload {
  sort: SearchSort;
  term: string;
}

export interface SearchHtmlData {
  state: SearchState;
}
