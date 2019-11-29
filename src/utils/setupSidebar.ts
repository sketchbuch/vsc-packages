import * as vscode from 'vscode';
import { ExtViewList, ExtViews } from '../types';
import { PackageList } from '../trees';

const setupSidebar = (extViews: ExtViews) => {
  Object.keys(extViews).forEach((view: string) => {
    const treeDataProvider = new PackageList(view, vscode.workspace.workspaceFolders || null);
    vscode.window.registerTreeDataProvider(extViews[view as ExtViewList], treeDataProvider);
  });
};

export default setupSidebar;
