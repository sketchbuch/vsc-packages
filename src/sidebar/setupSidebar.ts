import * as vscode from 'vscode';
import { EXT, FS_JSON, FS_PACKAGEJSON } from '../constants';
import { ExtViewList, ExtViews, GetPackageJson } from '../types';
import { getPackageJson } from '../utils';
import { PackageList, shouldShowView } from '.';

const treeProviders: { [key: string]: PackageList } = {};

const setupSidebar = (extViews: ExtViews, context: vscode.ExtensionContext): void => {
  const packageJson: GetPackageJson = getPackageJson(vscode.workspace.workspaceFolders);

  Object.keys(extViews).forEach((view: string) => {
    // Update the value used by the view's "when" condition
    const isVisible = shouldShowView(view as ExtViewList, packageJson);
    vscode.commands.executeCommand('setContext', `${EXT}-${view}`, isVisible);

    // Create view
    const treeDataProvider = new PackageList(view, packageJson, context.extensionPath);
    const disposable = vscode.window.registerTreeDataProvider(
      extViews[view as ExtViewList],
      treeDataProvider
    );
    context.subscriptions.push(disposable);
    treeProviders[view] = treeDataProvider;
  });

  vscode.workspace.onDidSaveTextDocument((event: vscode.TextDocument) => {
    const { workspaceFolders } = vscode.workspace;

    if (workspaceFolders && workspaceFolders.length > 0) {
      const { uri, languageId } = event;

      if (languageId === FS_JSON) {
        // Is folder's package.json
        if (uri.fsPath === `${workspaceFolders[0].uri.fsPath}/${FS_PACKAGEJSON}`) {
          const newPackageJson: GetPackageJson = getPackageJson(vscode.workspace.workspaceFolders);

          Object.keys(extViews).forEach(view => {
            const isVisible = shouldShowView(view as ExtViewList, packageJson);
            vscode.commands.executeCommand('setContext', `${EXT}-${view}`, isVisible);

            treeProviders[view].refresh(newPackageJson);
          });
        }
      }
    }
  });
};

export default setupSidebar;
