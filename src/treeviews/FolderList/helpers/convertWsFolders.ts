import * as vscode from 'vscode';
import { VsCodeWsFolders, WsFolders } from '../FolderList.interface';

export const convertWsFolders = (workspaceFolders: VsCodeWsFolders): WsFolders => {
  if (workspaceFolders) {
    return workspaceFolders.reduce((allFolders: WsFolders, curWsFolder: vscode.WorkspaceFolder) => {
      return [
        ...allFolders,
        {
          name: curWsFolder.name,
          uri: curWsFolder.uri,
        },
      ];
    }, []);
  }

  return [];
};
