import axios, { AxiosResponse } from 'axios';
import { httpStatusCodes, URL_NPM_SEARCH } from '../../constants';
import { NpmSearchResults } from '../../types';

export const searchNpm = async (searchTerm: string): Promise<NpmSearchResults> => {
  return await axios.get(`${URL_NPM_SEARCH}${searchTerm}`).then((response: AxiosResponse) => {
    if (response.status === httpStatusCodes.OK) {
      return response.data;
    }

    return Promise.reject(
      new Error(`An error occured whilst trying to search NPM for "${searchTerm}"`)
    );
  });
};
