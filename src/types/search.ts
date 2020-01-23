export type SearchData = {};

export interface SearchState {
  data?: SearchNormalisedResults;
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

export interface SearchNormalisedResult {
  description: string;
  name: string;
  version: string;
}

export interface SearchNormalisedResults {
  from: number;
  results: SearchNormalisedResult[];
  total: number;
}
