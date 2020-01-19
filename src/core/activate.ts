import * as vscode from 'vscode';
import { ExtViews } from '../types';
import { registerCommands } from '../commands';
import { extViews } from '../constants';
import { registerWebviews } from '../webviews';
import { setupSidebar } from '../sidebar';

export const setupExt = (extViews: ExtViews, context: vscode.ExtensionContext) => {
  registerCommands(context);
  registerWebviews(context);
  setupSidebar(extViews, context, vscode.workspace.workspaceFolders);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(extViews, context);
};
