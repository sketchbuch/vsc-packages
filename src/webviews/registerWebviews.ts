import * as vscode from 'vscode';
import { EXT_GLOBALSTATE_KEY, EXT_GLOBALSTATE_VERSION_KEY } from '../constants';
import { packageWebview, searchWebview } from '.';

export const registerWebviews = (context: vscode.ExtensionContext) => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(packageWebview.getViewType(), {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        packageWebview.revive(context, webviewPanel, {
          packageName: context.globalState.get(EXT_GLOBALSTATE_KEY) || '',
          packageVersion: context.globalState.get(EXT_GLOBALSTATE_VERSION_KEY) || '',
        });
      },
    });

    vscode.window.registerWebviewPanelSerializer(searchWebview.getViewType(), {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        searchWebview.revive(context, webviewPanel, {});
      },
    });
  }
};
