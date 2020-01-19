import * as vscode from 'vscode';
import { CmdCallback } from '../../types';

export const cmdSearchNpm: CmdCallback = (context: vscode.ExtensionContext): void => {
  console.log('### search npm');
};
