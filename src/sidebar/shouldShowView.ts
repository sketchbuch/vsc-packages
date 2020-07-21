import { GetPackageJsonResult, ExtDepTypes } from '../types';

export const shouldShowView = (view: ExtDepTypes, packageJson: GetPackageJsonResult): boolean => {
  const { data, error } = packageJson;

  if (data !== null && !error) {
    if (data[view] !== undefined) {
      return true;
    }
  }

  return false;
};
