import * as vscode from 'vscode';

export type ExtViewList = 'dependencies' | 'devDependencies';
export type ExtViews = { [view in ExtViewList]: string };

export type CmdCallback = (packageName: string, context: vscode.ExtensionContext) => void;

export interface Cmd {
  cmd: string;
  callback: CmdCallback;
}
