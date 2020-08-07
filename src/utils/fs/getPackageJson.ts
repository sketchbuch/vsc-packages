import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { FS_PACKAGEJSON, FS_UTF8 } from '../../constants';
import { GetPackageJsonResult } from '../../types';
import { pathExists } from './pathExists';
import { WsFolder } from '../../treeviews/FolderList/FolderList.interface';

export const getPackageJson = (workspaceFolder: WsFolder): GetPackageJsonResult => {
  if (workspaceFolder) {
    const packageJsonPath: string = path.join(workspaceFolder.uri.fsPath, FS_PACKAGEJSON);

    if (pathExists(packageJsonPath)) {
      let packageJson = '';

      try {
        packageJson = fs.readFileSync(packageJsonPath, FS_UTF8);
        return {
          data: JSON.parse(packageJson),
          error: null,
        };
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error whilst reading package.json for ${workspaceFolder.name}: ${error.message}`
        );

        return {
          data: null,
          error,
        };
      }
    }
  }

  return {
    data: null,
    error: null,
  };
};
