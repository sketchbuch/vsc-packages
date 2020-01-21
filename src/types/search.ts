export type SearchData = {};

export interface SearchState {
  term: string;
}

export interface SearchPmPayload {
  term: string;
}

export interface SearchHtmlData {
  state: SearchState;
}
