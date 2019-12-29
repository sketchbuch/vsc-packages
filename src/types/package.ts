import { NpmPackageData } from './';

export interface PackageState {
  data?: NpmPackageData;
  error?: Error;
}
