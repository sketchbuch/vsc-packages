import * as vscode from 'vscode';
import { FolderList, PackageList } from '../treeviews';
import { WorkspaceFolders } from '../types';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  workspaceFolders: WorkspaceFolders
): void => {
  const folderTreeDataProvider = new FolderList(workspaceFolders, context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      'vsc-packages-activitybar-folders',
      folderTreeDataProvider
    )
  );

  const packageJsonDataProvider = new PackageList(context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      'vsc-packages-activitybar-packagejson',
      packageJsonDataProvider
    )
  );
  context.workspaceState.update('packageJsonDataProvider', packageJsonDataProvider);
};
