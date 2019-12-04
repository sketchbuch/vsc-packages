import * as vscode from 'vscode';
import { CmdCallback } from '../../types';
import Package from '../../webviews/Package/Package';

const cmdDisplayPackage: CmdCallback = (
  packageName: string,
  context: vscode.ExtensionContext
): void => {
  Package.createOrShow(packageName, context);
};

export default cmdDisplayPackage;
