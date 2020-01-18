import * as vscode from 'vscode';
import { FS_PACKAGEJSON } from '../constants';
import { getPackageJson } from '../utils';
import { PackageList } from '../treeviews';
import { refreshViews, setViewContext } from '.';
import {
  ExtViewList,
  ExtViews,
  GetPackageJsonResult,
  TreeProviders,
  WorkspaceFolders,
} from '../types';

export const setupSidebar = (
  extViews: ExtViews,
  context: vscode.ExtensionContext,
  workspaceFolders: WorkspaceFolders
): void => {
  const treeProviders: TreeProviders = {};
  const packageJson: GetPackageJsonResult = getPackageJson(workspaceFolders);

  Object.keys(extViews).forEach((view: string) => {
    setViewContext(view, packageJson);

    const treeDataProvider = new PackageList(view, packageJson, context.extensionPath);
    const disposable = vscode.window.registerTreeDataProvider(
      extViews[view as ExtViewList],
      treeDataProvider
    );
    context.subscriptions.push(disposable);

    treeProviders[view] = treeDataProvider;
  });

  if (workspaceFolders && workspaceFolders.length > 0) {
    const watcher = vscode.workspace.createFileSystemWatcher(
      `${workspaceFolders[0].uri.fsPath}/${FS_PACKAGEJSON}`
    );

    watcher.onDidChange(() => {
      refreshViews(extViews, treeProviders);
    });

    watcher.onDidDelete(() => {
      refreshViews(extViews, treeProviders);
    });

    watcher.onDidCreate(() => {
      refreshViews(extViews, treeProviders);
    });

    context.subscriptions.push(watcher);
  }
};
