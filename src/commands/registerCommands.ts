import * as vscode from 'vscode';
import { Cmd } from '../types';
import { PackageListItem } from '../sidebar';

const registerCommands = (cmdList: Cmd[], context: vscode.ExtensionContext): void => {
  const { registerCommand } = vscode.commands;

  cmdList.forEach((cmd: Cmd) => {
    const disposable = registerCommand(cmd.cmd, (pkg: string | PackageListItem) => {
      // PackageListItem if command call or string if click on item (see PackageList)
      if (pkg instanceof PackageListItem) {
        cmd.callback(pkg.label, context);
      } else {
        cmd.callback(pkg, context);
      }
    });
    context.subscriptions.push(disposable);
  });
};

export default registerCommands;
