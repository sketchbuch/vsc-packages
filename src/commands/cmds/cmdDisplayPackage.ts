import * as vscode from 'vscode';
import { packageWebview } from '../../webviews';

export const cmdDisplayPackage = (
  packageName: string,
  packageVersion: string,
  context: vscode.ExtensionContext
): void => {
  packageWebview.show(context, {
    packageName,
    packageVersion,
  });
};
