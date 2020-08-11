import * as vscode from 'vscode';
import {
  CMD_DISPLAY_PACKAGE,
  CMD_OPEN_NPM,
  CMD_REFRESH_FOLDERS,
  CMD_SEARCH_PACKAGES,
  CMD_SEARCH_RESULTS,
  CMD_SELECT_FOLDER,
} from '../constants';
import { cmdDisplayPackage, cmdOpenNpm, cmdSearchNpm, cmdSelectFolder } from '.';
import { convertWsFolders } from '../treeviews/FolderList/helpers/convertWsFolders';
import { FolderList, PackageList, PackageItem } from '../treeviews';

export const registerCommands = (
  context: vscode.ExtensionContext,
  folderTreeDataProvider: FolderList,
  packageJsonDataProvider: PackageList
): void => {
  const { registerCommand } = vscode.commands;

  context.subscriptions.push(
    registerCommand(CMD_DISPLAY_PACKAGE, (packageName: string, packageVersion: string): void => {
      cmdDisplayPackage(packageName, packageVersion, context);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NPM, (packageName: PackageItem): void => {
      cmdOpenNpm(packageName);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_REFRESH_FOLDERS, (): void => {
      folderTreeDataProvider.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_SEARCH_PACKAGES, (): void => {
      cmdSearchNpm(context);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_SEARCH_RESULTS, (): void => {
      cmdSearchNpm(context);
    })
  );

  context.subscriptions.push(
    registerCommand(
      CMD_SELECT_FOLDER,
      (folder: vscode.WorkspaceFolder, context: vscode.ExtensionContext): void => {
        cmdSelectFolder(folder, context, packageJsonDataProvider);
      }
    )
  );
};
