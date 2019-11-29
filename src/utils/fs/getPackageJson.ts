import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { FS_PACKAGEJSON, FS_UTF8 } from '../../constants';
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';
import { pathExists } from './pathExists';

const getPackageJson = (
  wkspFolder: vscode.WorkspaceFolder
): JSONSchemaForNPMPackageJsonFiles | null => {
  const packageJsonPath: string = path.join(wkspFolder.uri.fsPath, FS_PACKAGEJSON);

  if (pathExists(packageJsonPath)) {
    const packageJson: JSONSchemaForNPMPackageJsonFiles = JSON.parse(
      fs.readFileSync(packageJsonPath, FS_UTF8)
    );
    return packageJson;
  }

  return null;
};

export default getPackageJson;
