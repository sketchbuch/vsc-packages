import * as vscode from 'vscode';
import { searchWebview } from '../../webviews';

export const cmdSearchNpm = (context: vscode.ExtensionContext): void => {
  searchWebview.show(context, {});
};
