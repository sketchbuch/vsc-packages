import * as vscode from 'vscode';
import { EXT_GLOBALSTATE_KEY, EXT_GLOBALSTATE_VERSION_KEY } from '../constants';
import { Package } from '.';

export const registerWebviews = (context: vscode.ExtensionContext) => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(Package.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        Package.revive(
          {
            packageName: context.globalState.get(EXT_GLOBALSTATE_KEY) || '',
            packageVersion: context.globalState.get(EXT_GLOBALSTATE_VERSION_KEY) || '',
          },
          webviewPanel,
          context
        );
      },
    });
  }
};
