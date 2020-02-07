import * as vscode from 'vscode';
import { exec } from 'child_process';
import { ExtViewList } from '../../types';

export const addPackage = (
  pkgName: string,
  installType: ExtViewList,
  folder: vscode.WorkspaceFolder
): Promise<{
  error?: Error;
  stdout: string;
  stderr: string;
}> => {
  const packageManager: 'yarn' | 'npm' =
    vscode.workspace.getConfiguration().get('packageManager') || 'yarn';
  const options = { cwd: folder.uri.path };
  const depType = installType.replace('Dependencies', '');
  let command: string;

  if (packageManager === 'npm' && installType === 'peerDependencies') {
    vscode.window.showWarningMessage(
      `Unable to install peer dependencies when using NPM. ${pkgName} will instead be installed in dependecies - please manually edit package,json`
    );
  }

  if (packageManager === 'npm') {
    const npmInstallType = installType === 'peerDependencies' ? 'dependencies' : installType;
    const installSwitch = npmInstallType !== 'dependencies' ? `--save-${depType} ` : '--save ';
    command = `npm install ${installSwitch}${pkgName}`;
  } else {
    const installSwitch = installType !== 'dependencies' ? ` --${depType}` : '';
    command = `yarn add ${pkgName}${installSwitch}`;
  }

  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      }

      resolve({ stdout, stderr });
    });
  });
};
