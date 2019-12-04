import * as vscode from 'vscode';
import { Package } from '.';

const registerWebviews = (context: vscode.ExtensionContext) => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(Package.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        Package.revive(context.globalState.get('lastPackage') || '', webviewPanel, context);
      },
    });
  }
};

export default registerWebviews;
