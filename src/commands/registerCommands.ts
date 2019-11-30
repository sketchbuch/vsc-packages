import * as vscode from 'vscode';
import { Cmd } from '../types';

const registerCommands = (cmdList: Cmd[]) => {
  const { registerCommand } = vscode.commands;

  cmdList.forEach((cmd: Cmd) => {
    registerCommand(cmd.cmd, (packageName: string) => cmd.callback(packageName));
  });
};

export default registerCommands;
