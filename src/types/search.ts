export type SearchData = {};

export interface SearchState {
  data?: SearchData;
  error?: Error;
}
export interface SearchHtmlData {
  state: SearchState;
}
