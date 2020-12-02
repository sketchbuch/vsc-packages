/* eslint-disable @typescript-eslint/no-unused-vars */
import * as vscode from 'vscode';
import { packageName } from '.';
import { getPackageTabTitle } from '../../utils/strings/getPackageTabTitle';

const webview = {} as vscode.Webview;

const mockPanel: vscode.WebviewPanel = {
  active: true,
  dispose: () => {
    // Do nothing...
  },
  onDidChangeViewState: (e: never) => {
    // Do nothing...
  },
  onDidDispose: (e: never) => {
    // Do nothing...
  },
  options: {},
  reveal: (viewColumn?: vscode.ViewColumn, preserveFocus?: boolean) => {
    // Do nothing...
  },
  title: getPackageTabTitle(packageName),
  viewType: 'test-view-type',
  visible: true,
  webview,
} as vscode.WebviewPanel;

export default { ...mockPanel } as vscode.WebviewPanel;
