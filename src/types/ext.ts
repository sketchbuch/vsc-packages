import { JSONSchemaForNPMPackageJsonFiles as PackageJsonNpm } from '@schemastore/package';
import { FS_FOLDER_IMAGES_DARK, FS_FOLDER_IMAGES_LIGHT } from '../constants';
import { DependencyItem, PackageItem, PackageList } from '../treeviews';
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
export type PackageListChild = PackageItem | DependencyItem;
export type PackageListChildren = PackageListChild[];

export type AddPackageData = {
  dependencyType: ExtDepTypes;
  error: ExecException | null;
  stdout: string;
  stderr: string;
};

export type AddPackage = Promise<AddPackageData>;

export interface PackageJsonYarn {
  workspaces?: string[]
}

export type PackageJson = PackageJsonNpm & PackageJsonYarn;

export interface GetPackageJsonResult {
  data: PackageJson | null
  error?: Error | null
}
