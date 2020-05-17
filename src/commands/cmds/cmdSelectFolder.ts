import * as vscode from 'vscode';
import { EXT, EXT_WSSTATE_SELFOLDER } from '../../constants';
import { PackageList } from '../../treeviews';

export const cmdSelectFolder = (
  folder: vscode.WorkspaceFolder,
  context: vscode.ExtensionContext,
  packageJsonDataProvider: PackageList
): void => {
  const prevFolder = context.workspaceState.get<vscode.WorkspaceFolder>(EXT_WSSTATE_SELFOLDER);

  context.workspaceState.update(EXT_WSSTATE_SELFOLDER, folder);
  vscode.commands.executeCommand('setContext', `${EXT}-folder`, folder);

  if (prevFolder && prevFolder.name !== folder.name) {
    packageJsonDataProvider.refresh();
  }
};
