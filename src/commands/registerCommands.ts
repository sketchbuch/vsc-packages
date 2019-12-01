import * as vscode from 'vscode';
import { Cmd } from '../types';

const registerCommands = (cmdList: Cmd[], context: vscode.ExtensionContext): void => {
  const { registerCommand } = vscode.commands;

  cmdList.forEach((cmd: Cmd) => {
    const disposable = registerCommand(cmd.cmd, (packageName: string) => cmd.callback(packageName));
    context.subscriptions.push(disposable);
  });
};

export default registerCommands;
