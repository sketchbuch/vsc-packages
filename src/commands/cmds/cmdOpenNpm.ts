import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../constants';

export const cmdOpenNpm = (packageName: string): void => {
  vscode.commands.executeCommand(CMD_VSCODE_OPEN, vscode.Uri.parse(`${URL_NPM}${packageName}`));
};
