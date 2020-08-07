import * as vscode from 'vscode';
import { EXT_STATE_KEY, EXT_STATE_VERSION_KEY } from '../constants';
import { packageWebview, searchWebview } from '.';

export const registerWebviews = (context: vscode.ExtensionContext): void => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(packageWebview.getViewType(), {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        packageWebview.revive(context, webviewPanel, {
          packageName: context.workspaceState.get(EXT_STATE_KEY) || '',
          packageVersion: context.workspaceState.get(EXT_STATE_VERSION_KEY) || '',
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
