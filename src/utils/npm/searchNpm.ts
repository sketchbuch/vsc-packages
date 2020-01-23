import axios, { AxiosResponse } from 'axios';
import { httpStatusCodes, URL_NPM_SEARCH } from '../../constants';
import { normaliseSearchResults } from '.';
import { NpmSearchResults, SearchNormalisedResults } from '../../types';

export const searchNpm = async (searchTerm: string): Promise<SearchNormalisedResults> => {
  return await axios
    .get(`${URL_NPM_SEARCH}${searchTerm}`)
    .then((response: AxiosResponse<NpmSearchResults>) => {
      if (response.status === httpStatusCodes.OK) {
        return normaliseSearchResults(response.data);
      }

      return Promise.reject(
        new Error(`An error occured whilst trying to search NPM for "${searchTerm}"`)
      );
    });
};
