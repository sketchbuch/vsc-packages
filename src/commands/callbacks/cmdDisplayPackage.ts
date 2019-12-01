import * as vscode from 'vscode';
import { CmdCallback } from '../../types';
import { CMD_VSCODE_OPEN_WV } from '../../constants';
import { getPackageTabTitle } from '../../utils';

const cmdDisplayPackage: CmdCallback = (packageName: string): void => {
  vscode.window.createWebviewPanel(
    CMD_VSCODE_OPEN_WV,
    getPackageTabTitle(packageName),
    vscode.ViewColumn.Active
  );
};

export default cmdDisplayPackage;
