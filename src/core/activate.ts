import * as vscode from 'vscode';
import { Cmd, ExtViews } from '../types';
import { cmdList, registerCommands } from '../commands';
import { extViews } from '../constants';
import { registerWebviews } from '../webviews';
import { setupSidebar } from '../sidebar';

export const setupExt = (cmdList: Cmd[], extViews: ExtViews, context: vscode.ExtensionContext) => {
  registerCommands(cmdList, context);
  registerWebviews(context);
  setupSidebar(extViews, context, vscode.workspace.workspaceFolders);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(cmdList, extViews, context);
};
