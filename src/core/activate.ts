import * as vscode from 'vscode';
import { getVscodeLang, loadTranslations } from 'vscode-ext-localisation';
import { registerCommands } from '../commands';
import { setupSidebar } from '../sidebar';
import { FolderList, PackageList } from '../treeviews';
import { registerWebviews } from '../webviews';

export const setupExt = (context: vscode.ExtensionContext, lang: string): void => {
  loadTranslations(lang, context.extensionPath);

  const packageJsonDataProvider = new PackageList(context);
  const folderTreeDataProvider = new FolderList(vscode.workspace.workspaceFolders, context);

  registerCommands(context, folderTreeDataProvider, packageJsonDataProvider);
  registerWebviews(context);
  setupSidebar(context, folderTreeDataProvider, packageJsonDataProvider);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
