import * as vscode from 'vscode';
import PackageListItem from './PackageListItem';
import { getPackageJson } from '../../utils/';

export class PackageList implements vscode.TreeDataProvider<PackageListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListItem | undefined> = new vscode.EventEmitter<
    PackageListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(
    private packageKey: string,
    private workspaceFolders: vscode.WorkspaceFolder[] | null
  ) {}

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
        if (packageJson[this.packageKey]) {
          Object.keys(packageJson[this.packageKey]).forEach((dep: string) => {
            const depItem = new PackageListItem(dep, vscode.TreeItemCollapsibleState.None);
            children.push(depItem);
          });
        }
      }
    } else {
      const empty = new PackageListItem(
        `No ${this.packageKey} found`,
        vscode.TreeItemCollapsibleState.None
      );
      children.push(empty);
    }

    return Promise.resolve(children.sort());
  }
}

export default PackageList;
