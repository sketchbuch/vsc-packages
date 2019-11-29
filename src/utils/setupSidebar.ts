import * as vscode from 'vscode';
import { PackageList } from '../trees';
import { extViews } from '../constants';
import { ExtViewList } from '../types';

const setupSidebar = () => {
  Object.keys(extViews).forEach((view: string) => {
    const treeDataProvider = new PackageList(view, vscode.workspace.workspaceFolders || null);
    vscode.window.registerTreeDataProvider(extViews[view as ExtViewList], treeDataProvider);
  });
};

export default setupSidebar;
