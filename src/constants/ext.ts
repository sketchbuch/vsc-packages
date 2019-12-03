import { ExtViews } from '../types';

export const EXT = 'vsc-packages';
export const EXT_ACTIVITYBAR = `${EXT}-activitybar`;
export const EXT_ACTIVITYBAR_DEPS = `${EXT_ACTIVITYBAR}-deps`;
export const EXT_ACTIVITYBAR_DEVDEPS = `${EXT_ACTIVITYBAR}-dev-deps`;
export const EXT_PACKAGELIST_ITEM_CTX = 'package-list-item';
export const EXT_GLOBALSTATE_KEY = 'lastPackage';

export const extViews: ExtViews = {
  dependencies: EXT_ACTIVITYBAR_DEPS,
  devDependencies: EXT_ACTIVITYBAR_DEVDEPS,
};
Object.freeze(extViews);
