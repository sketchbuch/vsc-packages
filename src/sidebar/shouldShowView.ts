import { GetPackageJsonResult, ExtDepTypes } from '../types';

export const shouldShowView = (view: ExtDepTypes, packageJson: GetPackageJsonResult): boolean => {
  if (packageJson !== null && !(packageJson instanceof Error)) {
    if (packageJson[view] !== undefined) {
      return true;
    }
  }

  return false;
};
