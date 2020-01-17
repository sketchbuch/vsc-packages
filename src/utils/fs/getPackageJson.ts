import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { FS_PACKAGEJSON, FS_UTF8 } from '../../constants';
import { GetPackageJsonResult } from '../../types';
import { pathExists } from './pathExists';

const getPackageJson = (
  workspaceFolders: vscode.WorkspaceFolder[] | undefined
): GetPackageJsonResult => {
  if (workspaceFolders && workspaceFolders.length > 0) {
    const packageJsonPath: string = path.join(workspaceFolders[0].uri.fsPath, FS_PACKAGEJSON);

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

export default getPackageJson;
