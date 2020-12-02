import search from 'libnpmsearch';
import { SEARCH_LIMIT } from '../../constants';
import { NpmSearchResults } from '../../types';

const defaultOptions: search.Options = Object.freeze({
  from: 0,
  limit: SEARCH_LIMIT,
  sortBy: 'optimal',
});

export const searchNpm = async (
  searchTerm: string,
  options: search.Options = {}
): Promise<NpmSearchResults> => {
  return await search(searchTerm, { ...defaultOptions, ...options });
};
