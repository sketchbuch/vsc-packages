import * as vscode from 'vscode';
import { ExtViewList, ExtViews } from '../types';
import { PackageList } from '.';

const setupSidebar = (extViews: ExtViews, context: vscode.ExtensionContext): void => {
  Object.keys(extViews).forEach((view: string) => {
    const treeDataProvider = new PackageList(
      view,
      vscode.workspace.workspaceFolders || null,
      context.extensionPath
    );
    const disposable = vscode.window.registerTreeDataProvider(
      extViews[view as ExtViewList],
      treeDataProvider
    );
    context.subscriptions.push(disposable);
  });
};

export default setupSidebar;
