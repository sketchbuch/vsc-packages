import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { FS_PACKAGEJSON, FS_UTF8 } from '../../constants';
import { GetPackageJsonResult } from '../../types';
import { pathExists } from './pathExists';

export const getPackageJson = (workspaceFolder: vscode.WorkspaceFolder): GetPackageJsonResult => {
  if (workspaceFolder) {
    const packageJsonPath: string = path.join(workspaceFolder.uri.fsPath, FS_PACKAGEJSON);

    if (pathExists(packageJsonPath)) {
      let packageJson: string = '';

      try {
        packageJson = fs.readFileSync(packageJsonPath, FS_UTF8);
        return JSON.parse(packageJson);
      } catch (error) {
        return error;
      }
    }
  }

  return null;
};
