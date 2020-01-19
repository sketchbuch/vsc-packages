import * as vscode from 'vscode';
import { CmdCallbackItem } from '../../types';
import { Package } from '../../webviews';

export const cmdDisplayPackage: CmdCallbackItem = (
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
