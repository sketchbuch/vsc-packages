export type SearchData = {};

export interface SearchState {
  data?: SearchData;
  error?: Error;
  term: string;
}

export interface SearchPmPayload {
  term: string;
}

export interface SearchHtmlData {
  state: SearchState;
}
