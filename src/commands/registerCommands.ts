import * as vscode from 'vscode';
import {
  CMD_DISPLAY_PACKAGE,
  CMD_OPEN_NPM,
  CMD_SEARCH_PACKAGES,
  CMD_SEARCH_RESULTS,
} from '../constants';
import { cmdDisplayPackage, cmdOpenNpm, cmdSearchNpm } from '.';

export const registerCommands = (context: vscode.ExtensionContext): void => {
  const { registerCommand } = vscode.commands;

  context.subscriptions.push(
    registerCommand(CMD_DISPLAY_PACKAGE, (packageName: string, packageVersion: string): void => {
      cmdDisplayPackage(packageName, packageVersion, context);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NPM, (packageName: string): void => {
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
};
