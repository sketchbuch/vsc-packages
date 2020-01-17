import { GetPackageJsonResult, ExtViewList } from '../types';

const shouldShowView = (view: ExtViewList, packageJson: GetPackageJsonResult): boolean => {
  if (packageJson !== null && !(packageJson instanceof Error)) {
    if (packageJson[view] !== undefined) {
      return true;
    }
  }

  return false;
};

export default shouldShowView;
