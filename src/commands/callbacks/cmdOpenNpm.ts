import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../constants';
import { CmdCallback, CmdCallbackData } from '../../types';

const cmdOpenNpm: CmdCallback = ({ packageName }: CmdCallbackData): void => {
  vscode.commands.executeCommand(CMD_VSCODE_OPEN, vscode.Uri.parse(`${URL_NPM}${packageName}`));
};

export default cmdOpenNpm;
