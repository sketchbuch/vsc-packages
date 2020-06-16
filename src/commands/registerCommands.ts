import * as vscode from 'vscode';
import {
  CMD_DISPLAY_PACKAGE,
  CMD_OPEN_NPM,
  CMD_SEARCH_PACKAGES,
  CMD_SEARCH_RESULTS,
  CMD_SELECT_FOLDER,
} from '../constants';
import { cmdDisplayPackage, cmdOpenNpm, cmdSearchNpm, cmdSelectFolder } from '.';
import { PackageList, PackageListItem } from '../treeviews';

export const registerCommands = (
  context: vscode.ExtensionContext,
  packageJsonDataProvider: PackageList
): void => {
  const { registerCommand } = vscode.commands;

  context.subscriptions.push(
    registerCommand(CMD_DISPLAY_PACKAGE, (packageName: string, packageVersion: string): void => {
      cmdDisplayPackage(packageName, packageVersion, context);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NPM, (packageName: PackageListItem): void => {
      cmdOpenNpm(packageName);
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
