import * as vscode from 'vscode';
import { FolderList, PackageList } from '../treeviews';
import { WorkspaceFolders } from '../types';
import {
  EXT_ACTIVITYBAR_FOLDERS,
  EXT_ACTIVITYBAR_PACKAGEJSON,
  EXT_WSSTATE_JSON_DP,
} from '../constants';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  workspaceFolders: WorkspaceFolders
): void => {
  const folderTreeDataProvider = new FolderList(workspaceFolders, context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_FOLDERS, folderTreeDataProvider)
  );

  const packageJsonDataProvider = new PackageList(context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_PACKAGEJSON, packageJsonDataProvider)
  );
  context.workspaceState.update(EXT_WSSTATE_JSON_DP, packageJsonDataProvider);
};
