import { NpmSearchResults } from './npm';

export type SearchData = {};
export type SearchSortDefault = 'optimal';
export type SearchSort = 'maintenance' | SearchSortDefault | 'popularity' | 'quality';

export interface SearchState {
  data?: NpmSearchResults;
  error?: Error;
  loading: boolean;
  page: number;
  sort: SearchSort;
  term: string;
}

export interface SearchPmPayload {
  page?: number;
  sort?: SearchSort;
  term?: string;
}

export interface SearchHtmlData {
  state: SearchState;
}
