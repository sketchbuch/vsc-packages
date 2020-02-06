import * as vscode from 'vscode';
import { FolderList, PackageList } from '../treeviews';
import { WorkspaceFolders } from '../types';
import { EXT } from '../constants';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  workspaceFolders: WorkspaceFolders
): void => {
  if (workspaceFolders) {
    vscode.commands.executeCommand('setContext', `${EXT}-visible`, true);
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
  } else {
    vscode.commands.executeCommand('setContext', `${EXT}-visible`, false);
  }
};
