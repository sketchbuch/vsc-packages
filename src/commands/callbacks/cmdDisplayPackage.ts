import * as vscode from 'vscode';
import { CmdCallback } from '../../types';

export const cmdDisplayPackage: CmdCallback = (packageName: string) => {
  vscode.window.showInformationMessage('Display ' + packageName);
};

export default cmdDisplayPackage;
