import * as vscode from 'vscode';
import { ExtDeps } from '../types';
import { registerCommands } from '../commands';
import { extViews } from '../constants';
import { registerWebviews } from '../webviews';
import { setupSidebar } from '../sidebar';

export const setupExt = (extViews: ExtDeps, context: vscode.ExtensionContext) => {
  registerCommands(context);
  registerWebviews(context);
  setupSidebar(context, vscode.workspace.workspaceFolders);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(extViews, context);
};
