import * as vscode from 'vscode';
import { exec } from 'child_process';
import { ExtDepTypes, AddPackage, AddPackageData } from '../../types';

export const addPackage = (
  pkgName: string,
  installType: ExtDepTypes,
  folder: vscode.WorkspaceFolder
): AddPackage => {
  const packageManager: 'yarn' | 'npm' =
    vscode.workspace.getConfiguration().get('packageManager') || 'yarn';
  const options = { cwd: folder.uri.path };
  const cmdInstallType = installType.replace('Dependencies', '');
  let dependencyType = installType;
  let command: string;

  if (packageManager === 'npm' && installType === 'peerDependencies') {
    vscode.window.showWarningMessage(
      `Unable to install peer dependencies when using NPM. ${pkgName} will instead be installed in dependecies - please manually edit package,json`
    );
  }

  if (packageManager === 'npm') {
    dependencyType = installType === 'peerDependencies' ? 'dependencies' : installType;
    const installSwitch =
      dependencyType !== 'dependencies' ? `--save-${cmdInstallType} ` : '--save ';
    command = `npm install ${installSwitch}${pkgName}`;
  } else {
    const installSwitch = installType !== 'dependencies' ? ` --${cmdInstallType}` : '';
    command = `yarn add ${pkgName}${installSwitch}`;
  }

  return new Promise<AddPackageData>((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject({ dependencyType, error, stderr, stdout });
      }

      resolve({ dependencyType, error, stderr, stdout });
    });
  });
};
