import * as vscode from 'vscode';
import { PackageList } from '../trees';
import { EXT_ACTIVITYBAR_DEPS, EXT_ACTIVITYBAR_DEVDEPS } from '../constants';

export const activate = (): void => {
  const depsPackageListProvider = new PackageList(
    'dependencies',
    vscode.workspace.workspaceFolders || null
  );
  vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_DEPS, depsPackageListProvider);

  const devDepsPackageListProvider = new PackageList(
    'devDependencies',
    vscode.workspace.workspaceFolders || null
  );
  vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_DEVDEPS, devDepsPackageListProvider);
};

export default activate;
