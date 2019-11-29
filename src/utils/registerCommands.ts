import * as vscode from 'vscode';
import { CMD_DISPLAY_PACKAGE, CMD_OPEN_NPM, CMD_VSCODE_OPEN, URL_NPM } from '../constants';

export const cmdDisplayPackage = (packageName: string) => {
  vscode.window.showInformationMessage('Display ' + packageName);
};

export const cmdOpenNpm = (packageName: string) => {
  vscode.commands.executeCommand(CMD_VSCODE_OPEN, vscode.Uri.parse(`${URL_NPM}${packageName}`));
};

const registerCommands = () => {
  const { registerCommand } = vscode.commands;

  registerCommand(CMD_DISPLAY_PACKAGE, (packageName: string) => cmdDisplayPackage(packageName));
  registerCommand(CMD_OPEN_NPM, (packageName: string) => cmdOpenNpm(packageName));
};

export default registerCommands;
