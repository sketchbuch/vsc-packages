import * as vscode from 'vscode';
import Package from '../../webviews/Package/Package';
import { CmdCallback } from '../../types';

const cmdDisplayPackage: CmdCallback = (
  packageName: string,
  context: vscode.ExtensionContext
): void => {
  Package.createOrShow(packageName, context);
};

export default cmdDisplayPackage;
