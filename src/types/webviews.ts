import * as vscode from 'vscode';

export type PostMessageActions = 'search';

export interface PostMessage {
  action: PostMessageActions;
  payload: string;
}

export interface GetTemplate {
  cssPath: string;
  nonce: string;
  scriptPath: string;
}

export interface GetHtml<T> {
  extensionPath: string;
  template: (args: GetTemplate, htmlData: T) => string;
  htmlData: T;
}

export interface WebView {
  revive: (context: vscode.ExtensionContext) => void;
  show: (context: vscode.ExtensionContext) => void;
}
