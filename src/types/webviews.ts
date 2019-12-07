import * as vscode from 'vscode';

export interface GetTemplate {
  cssUri: vscode.Uri;
  packageName: string;
  nonce: string;
  scriptUri: vscode.Uri;
}

export interface GetHtml {
  getTemplate: (args: GetTemplate) => string;
  extensionPath: string;
  packageName: string;
  webview: vscode.Webview;
}
