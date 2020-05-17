import * as vscode from 'vscode';
import { ExtDeps } from '../types';
import { extViews } from '../constants';
import { PackageList } from '../treeviews';
import { registerCommands } from '../commands';
import { registerWebviews } from '../webviews';
import { setupSidebar } from '../sidebar';

let packageJsonDataProvider: PackageList | undefined = undefined;

export const setupExt = (extViews: ExtDeps, context: vscode.ExtensionContext) => {
  packageJsonDataProvider = new PackageList(context);
  registerCommands(context, packageJsonDataProvider);
  registerWebviews(context);
  setupSidebar(context, vscode.workspace.workspaceFolders, packageJsonDataProvider);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(extViews, context);
};
