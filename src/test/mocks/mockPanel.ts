import * as vscode from 'vscode';

const webview = {
  asWebviewUri: (localResource: vscode.Uri) => {},
} as vscode.Webview;

const mockPanel: vscode.WebviewPanel = {
  active: true,
  dispose: () => {},
  onDidChangeViewState: (e: any) => {},
  onDidDispose: (e: any) => {},
  options: {},
  reveal: (viewColumn?: vscode.ViewColumn, preserveFocus?: boolean) => {},
  title: 'A Title',
  viewType: 'test-view-type',
  visible: true,
  webview,
} as vscode.WebviewPanel;

export default { ...mockPanel };
