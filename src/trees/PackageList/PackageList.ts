import * as vscode from 'vscode';
import PackageListItem from './PackageListItem';
import getPackageJson from '../../utils/getPackageJson';

export class PackageList implements vscode.TreeDataProvider<PackageListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListItem | undefined> = new vscode.EventEmitter<
    PackageListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(private workspaceFolders: vscode.WorkspaceFolder[] | null) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: PackageListItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<PackageListItem[]> {
    const children: PackageListItem[] = [];

    if (this.workspaceFolders !== null && this.workspaceFolders.length > 0) {
      const packageJson = getPackageJson(this.workspaceFolders[0]);

      if (packageJson) {
        if (packageJson.dependencies) {
          Object.keys(packageJson.dependencies).forEach((dep: string) => {
            const depItem = new PackageListItem(dep, vscode.TreeItemCollapsibleState.None);
            children.push(depItem);
          });
        }

        if (packageJson.devDependencies) {
          Object.keys(packageJson.devDependencies).forEach((dep: string) => {
            const depItem = new PackageListItem(dep, vscode.TreeItemCollapsibleState.None);
            children.push(depItem);
          });
        }
      }
    } else {
      const empty = new PackageListItem('No packages', vscode.TreeItemCollapsibleState.None);
      children.push(empty);
    }

    return Promise.resolve(children);
  }
}

export default PackageList;
