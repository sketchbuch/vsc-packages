import * as vscode from 'vscode';
import { FolderList, PackageList } from '../treeviews';
import { ExtViews, WorkspaceFolders } from '../types';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  workspaceFolders: WorkspaceFolders
): void => {
  if (workspaceFolders) {
    const folderTreeDataProvider = new FolderList(workspaceFolders, context);
    const folderDisposable = vscode.window.registerTreeDataProvider(
      'vsc-packages-activitybar-folders',
      folderTreeDataProvider
    );
    context.subscriptions.push(folderDisposable);

    const packageJsonDataProvider = new PackageList(context);
    const packageJsonDisposable = vscode.window.registerTreeDataProvider(
      'vsc-packages-activitybar-packagejson',
      packageJsonDataProvider
    );
    context.subscriptions.push(packageJsonDisposable);
    context.workspaceState.update('packageJsonDataProvider', packageJsonDataProvider);
  }
};
