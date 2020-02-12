import * as vscode from 'vscode';
import {
  CMD_DISPLAY_PACKAGE,
  EXT_WSSTATE_SELFOLDER,
  extViews,
  FS_PACKAGEJSON,
} from '../../constants';
import { getPackageJson } from '../../utils';
import { PackageListItem, PackageListDep } from './';
import { PackageListChild, PackageListChildren } from '../../types';

export class PackageList implements vscode.TreeDataProvider<PackageListChild> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListChild | undefined> = new vscode.EventEmitter<
    PackageListChild | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListChild | undefined> = this._onDidChangeTreeData.event;

  private watchers: string[] = [];

  constructor(private context: vscode.ExtensionContext) {}

  createWatcher(folder: vscode.WorkspaceFolder): void {
    if (!this.watchers.includes(folder.name)) {
      const watcher = vscode.workspace.createFileSystemWatcher(
        `${folder.uri.fsPath}/${FS_PACKAGEJSON}`
      );

      watcher.onDidChange(() => {
        this.refresh();
      });

      watcher.onDidDelete(() => {
        this.refresh();
      });

      watcher.onDidCreate(() => {
        this.refresh();
      });

      this.context.subscriptions.push(watcher);
      this.watchers.push(folder.name);
    }
  }

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
    const curFolder = this.context.workspaceState.get<vscode.WorkspaceFolder>(
      EXT_WSSTATE_SELFOLDER
    );

    if (curFolder) {
      this.createWatcher(curFolder);
      const packageJson = getPackageJson(curFolder);

      if (packageJson instanceof Error) {
        vscode.window.showErrorMessage(
          `Error whilst reading package.json for ${curFolder.name}: ${packageJson.message}`
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
        if (packageJson instanceof Error) {
          const depTypeItem = new PackageListDep(
            'Error whilst reading package.json',
            -1,
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None
          );
          children.push(depTypeItem);
        } else if (packageJson === null) {
          const depTypeItem = new PackageListDep(
            'No package.json file found',
            -1,
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None
          );
          children.push(depTypeItem);
        } else {
          Object.keys(extViews)
            .sort()
            .forEach((depType: string) => {
              let depCount = 0;

              if (packageJson[depType] !== undefined) {
                depCount = Object.keys(packageJson[depType]).length;
              }

              if (depCount > 0) {
                const depTypeItem = new PackageListDep(
                  depType,
                  depCount,
                  this.context.extensionPath,
                  vscode.TreeItemCollapsibleState.Expanded
                );
                children.push(depTypeItem);
              }
            });
        }
      }
    }

    return Promise.resolve(children);
  }
}
