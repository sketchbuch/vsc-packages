import * as vscode from 'vscode';
import { FolderEmpty, FolderItem } from '.';

export type WsFolders = WsFolder[];

export interface WsFolder {
  name: string;
  parent?: string;
  uri: vscode.Uri;
}

export type FolderListChild = FolderItem | FolderEmpty;
export type FolderListChildren = FolderListChild[];
export type VsCodeWsFolders = readonly vscode.WorkspaceFolder[] | undefined;
