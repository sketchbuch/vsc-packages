import * as vscode from 'vscode';
import { FolderList, PackageList } from '../treeviews';
import { WorkspaceFolders } from '../types';
import { EXT_ACTIVITYBAR_FOLDERS, EXT_ACTIVITYBAR_PACKAGEJSON } from '../constants';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  workspaceFolders: WorkspaceFolders,
  packageJsonDataProvider: PackageList
): void => {
  const folderTreeDataProvider = new FolderList(workspaceFolders, context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_FOLDERS, folderTreeDataProvider)
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_PACKAGEJSON, packageJsonDataProvider)
  );
};
