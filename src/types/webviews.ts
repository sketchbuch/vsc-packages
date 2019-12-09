import * as vscode from 'vscode';

export interface GetTemplate {
  cssPath: string;
  packageName: string;
  nonce: string;
  scriptPath: string;
}

export interface GetHtml {
  getTemplate: (args: GetTemplate) => string;
  extensionPath: string;
  packageName: string;
  webview: vscode.Webview;
}
