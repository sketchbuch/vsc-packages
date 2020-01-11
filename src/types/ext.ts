import * as vscode from 'vscode';
import { FS_FOLDER_IMAGES_DARK, FS_FOLDER_IMAGES_LIGHT } from '../constants';

export type ExtViewList = 'dependencies' | 'devDependencies';
export type ExtViews = { [view in ExtViewList]: string };

export interface CmdCallbackData {
  packageName: string;
  packageVersion?: string;
}
export type CmdCallback = (data: CmdCallbackData, context: vscode.ExtensionContext) => void;

export interface Cmd {
  cmd: string;
  callback: CmdCallback;
}

export type ImgType = typeof FS_FOLDER_IMAGES_DARK | typeof FS_FOLDER_IMAGES_LIGHT;
