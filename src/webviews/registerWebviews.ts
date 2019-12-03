import * as vscode from 'vscode';
import { Package } from '.';

const registerWebviews = (context: vscode.ExtensionContext) => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(Package.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        console.log('### deserializeWebviewPanel');
        Package.revive(webviewPanel, context, context.globalState.get('lastPackage') || '');
      },
    });
  }
};

export default registerWebviews;
