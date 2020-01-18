import * as vscode from 'vscode';
import { CmdCallback, CmdCallbackData } from '../../types';
import { Package } from '../../webviews';

export const cmdDisplayPackage: CmdCallback = (
  data: CmdCallbackData,
  context: vscode.ExtensionContext
): void => {
  Package.createOrShow(data, context);
};
