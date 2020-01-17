import * as vscode from 'vscode';
import { CMD_DISPLAY_PACKAGE } from '../../constants';
import { GetPackageJsonResult } from '../../types';
import PackageListItem from './PackageListItem';

export class PackageList implements vscode.TreeDataProvider<PackageListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListItem | undefined> = new vscode.EventEmitter<
    PackageListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(
    private packageView: string,
    private packageJson: GetPackageJsonResult,
    private extensionPath: string
  ) {}

  refresh(newPackageJson: GetPackageJsonResult): void {
    this.packageJson = newPackageJson;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: PackageListItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<PackageListItem[]> {
    const children: PackageListItem[] = [];

    if (this.packageJson instanceof Error) {
      const error = new PackageListItem(
        'Error reading package.json',
        '',
        this.extensionPath,
        vscode.TreeItemCollapsibleState.None
      );
      children.push(error);
    } else if (this.packageJson === null) {
      const noFolders = new PackageListItem(
        'No Folder or Workspace opened',
        '',
        this.extensionPath,
        vscode.TreeItemCollapsibleState.None
      );
      children.push(noFolders);
    } else {
      const packageJson = this.packageJson;

      if (packageJson[this.packageView]) {
        Object.keys(packageJson[this.packageView]).forEach((dependency: string) => {
          const version: string = packageJson[this.packageView][dependency];
          const depItem = new PackageListItem(
            dependency,
            version,
            this.extensionPath,
            vscode.TreeItemCollapsibleState.None,
            {
              command: CMD_DISPLAY_PACKAGE,
              title: '',
              arguments: [dependency, version],
            }
          );
          children.push(depItem);
        });
      }

      if (children.length < 1) {
        const empty = new PackageListItem(
          `No ${this.packageView} found`,
          '',
          this.extensionPath,
          vscode.TreeItemCollapsibleState.None
        );
        children.push(empty);
      }
    }

    return Promise.resolve(children.sort());
  }
}

export default PackageList;
