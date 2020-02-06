import * as vscode from 'vscode';
import { EXT } from '../../constants';
import { PackageList } from '../../treeviews';

export const cmdSelectFolder = (
  folder: vscode.WorkspaceFolder,
  context: vscode.ExtensionContext
): void => {
  const prevFolder = context.workspaceState.get<vscode.WorkspaceFolder>('selectedFolder');

  context.workspaceState.update('selectedFolder', folder);
  vscode.commands.executeCommand('setContext', `${EXT}-folder`, folder);

  const packageJsonDataProvider = context.workspaceState.get<PackageList>(
    'packageJsonDataProvider'
  );

  if (packageJsonDataProvider && prevFolder && prevFolder.name !== folder.name) {
    packageJsonDataProvider.refresh();
  }
};
