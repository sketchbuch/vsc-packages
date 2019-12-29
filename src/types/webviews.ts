import * as vscode from 'vscode';
import { PackageState } from './';

export interface GetTemplate {
  cssPath: string;
  nonce: string;
  packageName: string;
  scriptPath: string;
  state: PackageState;
}

export interface GetHtml {
  extensionPath: string;
  getTemplate: (args: GetTemplate) => string;
  packageName: string;
  state: PackageState;
  webview: vscode.Webview;
}
