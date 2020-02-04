import * as vscode from 'vscode';

export type PostMessageActions = 'clear' | 'display-package' | 'search' | 'sort';

export interface PostMessage<T> {
  action: PostMessageActions;
  payload: T;
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

export interface WebView<T> {
  getViewType: () => string;
  revive: (context: vscode.ExtensionContext, revivedPanel: vscode.WebviewPanel, data: T) => void;
  show: (context: vscode.ExtensionContext, data: T) => void;
}
