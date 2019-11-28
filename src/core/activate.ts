import * as vscode from 'vscode';
import { PackageList } from '../trees';
import { EXT_ACTIVITYBAR_LIST } from '../constants';

export const activate = (): void => {
  const packageListProvider = new PackageList(vscode.workspace.workspaceFolders || null);
  vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_LIST, packageListProvider);
};

export default activate;
