import * as vscode from 'vscode';

export type WsFolders = WsFolder[];

export interface WsFolder {
  name: string
  parent?: string
  uri: vscode.Uri,
}

export type VsCodeWsFolders = readonly vscode.WorkspaceFolder[] | undefined;