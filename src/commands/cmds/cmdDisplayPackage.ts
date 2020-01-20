import * as vscode from 'vscode';
import { Package } from '../../webviews';

export const cmdDisplayPackage = (
  packageName: string,
  packageVersion: string,
  context: vscode.ExtensionContext
): void => {
  Package.createOrShow(
    {
      packageName,
      packageVersion,
    },
    context
  );
};
