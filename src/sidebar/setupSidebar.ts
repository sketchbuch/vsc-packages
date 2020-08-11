import * as vscode from 'vscode';
import { FolderList, PackageList } from '../treeviews';
import { EXT_ACTIVITYBAR_FOLDERS, EXT_ACTIVITYBAR_PACKAGEJSON } from '../constants';
import { convertWsFolders } from '../treeviews/FolderList/helpers/convertWsFolders';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  folderTreeDataProvider: FolderList,
  packageJsonDataProvider: PackageList
): void => {
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_FOLDERS, folderTreeDataProvider)
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_ACTIVITYBAR_PACKAGEJSON, packageJsonDataProvider)
  );

  vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    if (event.affectsConfiguration('depth')) {
      folderTreeDataProvider.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
    }
  });
};
