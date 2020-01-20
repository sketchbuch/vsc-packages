import * as vscode from 'vscode';
import { PackageState, TabboxId, CmdCallbackData } from './';

export interface GetTemplate {
  cssPath: string;
  htmlData: HtmlData;
  nonce: string;
  scriptPath: string;
}

export interface HtmlData {
  activeTab: TabboxId;
  packageData: CmdCallbackData;
  state: PackageState;
}

export interface GetHtml {
  extensionPath: string;
  getTemplate: (args: GetTemplate) => string;
  htmlData: HtmlData;
}

export interface SearchWebView {
  createOrShow: (context: vscode.ExtensionContext) => void;
  dispose: () => void;
  getHtmlForWebview: () => void;
  panel?: vscode.WebviewPanel;
  readonly viewType: string;
  revive: (context: vscode.ExtensionContext) => void;
  update: () => void;
}
