import * as vscode from 'vscode';
import { getVscodeLang, loadTranslations } from '../localisation';
import { PackageList } from '../treeviews';
import { registerCommands } from '../commands';
import { registerWebviews } from '../webviews';
import { setupSidebar } from '../sidebar';

let packageJsonDataProvider: PackageList | undefined = undefined;

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath);
  packageJsonDataProvider = new PackageList(context);
  registerCommands(context, packageJsonDataProvider);
  registerWebviews(context);
  setupSidebar(context, vscode.workspace.workspaceFolders, packageJsonDataProvider);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
