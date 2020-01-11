import * as vscode from 'vscode';
import { ExtViewList, ExtViews, GetPackageJson } from '../types';
import { getPackageJson } from '../utils';
import { PackageList } from '.';

const setupSidebar = (extViews: ExtViews, context: vscode.ExtensionContext): void => {
  const packageJson: GetPackageJson = getPackageJson(vscode.workspace.workspaceFolders);

  Object.keys(extViews).forEach((view: string) => {
    const treeDataProvider = new PackageList(view, packageJson, context.extensionPath);
    const disposable = vscode.window.registerTreeDataProvider(
      extViews[view as ExtViewList],
      treeDataProvider
    );
    context.subscriptions.push(disposable);
  });
};

export default setupSidebar;
