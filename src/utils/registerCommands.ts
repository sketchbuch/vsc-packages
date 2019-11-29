import * as vscode from 'vscode';
import { CMD_DISPLAY_PACKAGE, CMD_OPEN_NPM } from '../constants';

const registerCommands = () => {
  vscode.commands.registerCommand(CMD_DISPLAY_PACKAGE, (packageName: string) =>
    vscode.window.showInformationMessage('Display ' + packageName)
  );

  vscode.commands.registerCommand(CMD_OPEN_NPM, (packageName: string) =>
    vscode.commands.executeCommand(
      'vscode.open',
      vscode.Uri.parse(`https://www.npmjs.com/package/${packageName}`)
    )
  );
};

export default registerCommands;
