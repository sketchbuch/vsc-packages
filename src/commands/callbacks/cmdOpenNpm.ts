import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../constants';
import { CmdCallback } from '../../types';

export const cmdOpenNpm: CmdCallback = (packageName: string) => {
  vscode.commands.executeCommand(CMD_VSCODE_OPEN, vscode.Uri.parse(`${URL_NPM}${packageName}`));
};

export default cmdOpenNpm;
