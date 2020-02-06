import * as vscode from 'vscode';
import { CMD_DISPLAY_PACKAGE, extViews, EXT } from '../../constants';
import { getPackageJson } from '../../utils';
import { GetPackageJsonResult } from '../../types';
import { PackageListItem, PackageListDep } from './';

export type PackageListChild = PackageListItem | PackageListDep;
export type PackageListChildren = (PackageListItem | PackageListDep)[];

export class PackageList implements vscode.TreeDataProvider<PackageListChild> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListChild | undefined> = new vscode.EventEmitter<
    PackageListChild | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListChild | undefined> = this._onDidChangeTreeData.event;

  private packageJson: GetPackageJsonResult = null;
  private extensionPath: string = '';

  constructor(private context: vscode.ExtensionContext) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: PackageListItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<PackageListItem> {
    return null;
  }

  getChildren(element?: PackageListItem): Thenable<PackageListChildren> {
    const children: PackageListChildren = [];
    const curFolder = this.context.workspaceState.get<vscode.WorkspaceFolder>('selectedFolder');

    if (curFolder) {
      const packageJson = getPackageJson(curFolder);

      if (packageJson instanceof Error) {
        vscode.window.showErrorMessage(
          `An error occured whilst reading package.json for ${curFolder.name}: ${packageJson.message}`
        );
      }

      if (element) {
        const depType: string = element.label;

        if (!(packageJson instanceof Error) && packageJson !== null) {
          if (packageJson[depType]) {
            Object.keys(packageJson[depType])
              .sort()
              .forEach((dependency: string) => {
                const version: string = packageJson[depType][dependency];
                const depItem = new PackageListItem(
                  dependency,
                  version,
                  this.context.extensionPath,
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
        }
      } else {
        Object.keys(extViews)
          .sort()
          .forEach((depType: string) => {
            let depCount = 0;

            if (!(packageJson instanceof Error) && packageJson !== null) {
              if (packageJson[depType] !== undefined) {
                depCount = Object.keys(packageJson[depType]).length;
              }
            }

            if (depCount > 0) {
              const depTypeItem = new PackageListDep(
                depType,
                depCount,
                this.context.extensionPath,
                vscode.TreeItemCollapsibleState.Collapsed
              );
              children.push(depTypeItem);
            }
          });
      }
    }

    return Promise.resolve(children);
  }
}
