import * as vscode from 'vscode';
import { getPackageTabTitle } from '../../utils';
import { packageName } from '.';

const webview = {
  onDidReceiveMessage: (callback: () => void) => {},
  asWebviewUri: (localResource: vscode.Uri) => {},
} as vscode.Webview;

const mockPanel: vscode.WebviewPanel = {
  active: true,
  dispose: () => {},
  onDidChangeViewState: (e: any) => {},
  onDidDispose: (e: any) => {},
  options: {},
  reveal: (viewColumn?: vscode.ViewColumn, preserveFocus?: boolean) => {},
  title: getPackageTabTitle(packageName),
  viewType: 'test-view-type',
  visible: true,
  webview,
} as vscode.WebviewPanel;

export default { ...mockPanel } as vscode.WebviewPanel;
