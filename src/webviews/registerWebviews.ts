import * as vscode from 'vscode';
import { Package } from '.';

const registerWebviews = (context: vscode.ExtensionContext) => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(Package.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
        console.log(`Got state: ${state}`);
        Package.revive(webviewPanel, context.extensionPath);
      },
    });
  }
};

export default registerWebviews;
