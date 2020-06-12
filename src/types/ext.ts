import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';
import { FS_FOLDER_IMAGES_DARK, FS_FOLDER_IMAGES_LIGHT } from '../constants';
import { Dependency, Package, PackageList } from '../treeviews';
import { ExecException } from 'child_process';

export type ExtDepTypes =
  | 'dependencies'
  | 'devDependencies'
  | 'peerDependencies'
  | 'optionalDependencies';
export type ExtDeps = { [view in ExtDepTypes]: string };

export interface CmdCallbackData {
  packageName: string;
  packageVersion?: string;
}

export type ImgType = typeof FS_FOLDER_IMAGES_DARK | typeof FS_FOLDER_IMAGES_LIGHT;
export type TreeProviders = { [key: string]: PackageList };
export type PackageListChild = Package | Dependency;
export type PackageListChildren = PackageListChild[];

export type AddPackageData = {
  dependencyType: ExtDepTypes;
  error: ExecException | null;
  stdout: string;
  stderr: string;
};

export type AddPackage = Promise<AddPackageData>;

export interface GetPackageJsonResult {
  data: JSONSchemaForNPMPackageJsonFiles | null
  error?: Error | null
}
