import { t } from '../../localisation';

export const getPackageTabTitle = (packageName: string): string => {
  return t('webViews.packages.tabTitle', { packageName });
};
