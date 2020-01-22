export type SearchData = {};

export interface SearchState {
  error?: Error;
  loading: boolean;
  term: string;
}

export interface SearchPmPayload {
  term: string;
}

export interface SearchHtmlData {
  state: SearchState;
}
