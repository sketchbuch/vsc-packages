import * as vscode from 'vscode';
import { CmdCallback } from '../../types';

const cmdDisplayPackage: CmdCallback = (packageName: string): void => {
  vscode.window.showInformationMessage('Display ' + packageName);
};

export default cmdDisplayPackage;
