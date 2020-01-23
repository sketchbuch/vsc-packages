import {
  NpmSearchResult,
  NpmSearchResults,
  SearchNormalisedResult,
  SearchNormalisedResults,
} from '../../types';

export const normaliseSearchResults = (
  searchResults: NpmSearchResults
): SearchNormalisedResults => {
  const { results, ...otherProps } = searchResults;
  const normalisedResults: SearchNormalisedResults = {
    ...otherProps,
    results: [],
  };

  if (searchResults.total > 0 && searchResults.results.length > 0) {
    normalisedResults.results = results.map(
      (res: NpmSearchResult): SearchNormalisedResult => {
        return {
          description: res.description[0],
          name: res.name[0],
          version: res.version[0],
        };
      }
    );
  }

  return normalisedResults;
};
