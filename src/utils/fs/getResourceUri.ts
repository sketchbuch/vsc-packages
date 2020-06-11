import * as path from 'path';
import * as vscode from 'vscode';
import { FS_FOLDER_RESOURCES } from '../../constants';

export const getResourceUri = (extensionPath: string, folder: string): vscode.Uri => {
  return vscode.Uri.file(path.join(extensionPath, FS_FOLDER_RESOURCES, folder));
};
