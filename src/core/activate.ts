import * as vscode from 'vscode';
import { Cmd, ExtViews } from '../types';
import { cmdList, registerCommands } from '../commands';
import { extViews } from '../constants';
import { setupSidebar } from '../sidebar';

export const setupExt = (cmdList: Cmd[], extViews: ExtViews, context: vscode.ExtensionContext) => {
  registerCommands(cmdList, context);
  setupSidebar(extViews, context);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(cmdList, extViews, context);
};

export default activate;
