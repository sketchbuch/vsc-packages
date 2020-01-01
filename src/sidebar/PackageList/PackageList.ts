import * as vscode from 'vscode';
import PackageListItem from './PackageListItem';
import { CMD_DISPLAY_PACKAGE } from '../../constants';
import { getPackageJson } from '../../utils';

export class PackageList implements vscode.TreeDataProvider<PackageListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListItem | undefined> = new vscode.EventEmitter<
    PackageListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(
    private packageKey: string,
    private workspaceFolders: vscode.WorkspaceFolder[] | null,
    private extensionPath: string
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

      if (packageJson && packageJson[this.packageKey]) {
        Object.keys(packageJson[this.packageKey]).forEach((dependency: string) => {
          const version: string = packageJson[this.packageKey][dependency];
          const depItem = new PackageListItem(
            dependency,
            version,
            this.extensionPath,
            vscode.TreeItemCollapsibleState.None,
            {
              command: CMD_DISPLAY_PACKAGE,
              title: '',
              arguments: [dependency],
            }
          );
          children.push(depItem);
        });
      }
    }

    if (children.length < 1) {
      const empty = new PackageListItem(
        `No ${this.packageKey} found`,
        '',
        this.extensionPath,
        vscode.TreeItemCollapsibleState.None
      );
      children.push(empty);
    }

    return Promise.resolve(children.sort());
  }
}

export default PackageList;
