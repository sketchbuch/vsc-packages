import axios, { AxiosResponse } from 'axios';
import { httpStatusCodes, URL_NPM_REG } from '../../constants';
import { NpmPackageData } from '../../types';

export const getNpmPackageData = async (packageName: string): Promise<NpmPackageData> => {
  return await axios
    .get(`${URL_NPM_REG}${packageName}`)
    .then((response: AxiosResponse<NpmPackageData>) => {
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      }

      return Promise.reject(
        new Error(`An error occured whilst getting package data for "${packageName}"`)
      );
    });
};
