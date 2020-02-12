import * as vscode from 'vscode';
import { EXT, EXT_WSSTATE_JSON_DP, EXT_WSSTATE_SELFOLDER } from '../../constants';
import { PackageList } from '../../treeviews';

export const cmdSelectFolder = (
  folder: vscode.WorkspaceFolder,
  context: vscode.ExtensionContext
): void => {
  const prevFolder = context.workspaceState.get<vscode.WorkspaceFolder>(EXT_WSSTATE_SELFOLDER);

  context.workspaceState.update(EXT_WSSTATE_SELFOLDER, folder);
  vscode.commands.executeCommand('setContext', `${EXT}-folder`, folder);

  const packageJsonDataProvider = context.workspaceState.get<PackageList>(EXT_WSSTATE_JSON_DP);

  if (packageJsonDataProvider && prevFolder && prevFolder.name !== folder.name) {
    packageJsonDataProvider.refresh();
  }
};
