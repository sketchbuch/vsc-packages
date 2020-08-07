import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../constants';
import { PackageItem } from '../../treeviews/PackageList';

export const cmdOpenNpm = (packageData: PackageItem): void => {
  vscode.commands.executeCommand(
    CMD_VSCODE_OPEN,
    vscode.Uri.parse(`${URL_NPM}${packageData.label}`)
  );
};
