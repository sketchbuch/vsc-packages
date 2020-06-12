import * as vscode from 'vscode';
import { Dependency as DependencyType } from '@schemastore/package';
import {
  CMD_DISPLAY_PACKAGE,
  EXT_WSSTATE_SELFOLDER,
  extViews,
  FS_PACKAGEJSON,
} from '../../constants';
import { getPackageJson } from '../../utils';
import { Dependency, Package } from './';
import { GetPackageJsonResult , PackageListChild, PackageListChildren, } from '../../types';
import { t } from '../../localisation';

export class PackageList implements vscode.TreeDataProvider<PackageListChild> {
  _onDidChangeTreeData: vscode.EventEmitter<PackageListChild | undefined> = new vscode.EventEmitter<
    PackageListChild | undefined
  >();
  onDidChangeTreeData: vscode.Event<PackageListChild | undefined> = this._onDidChangeTreeData.event;

  private watchers: string[] = [];
  private packageJson: GetPackageJsonResult | null = null;

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
    this.packageJson = null;
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: Package): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<Package> {
    return null;
  }

  getChildren(element?: Package): Thenable<PackageListChildren> {
    const curFolder = this.context.workspaceState.get<vscode.WorkspaceFolder>(
      EXT_WSSTATE_SELFOLDER
    );
    let children: PackageListChildren = [];

    if (curFolder) {
      this.createWatcher(curFolder);

      if (this.packageJson === null) {
        this.packageJson = getPackageJson(curFolder);
      }

      if (element) {
        children = this.getPackage(this.packageJson, element);
      } else {
        children = this.getDependency(this.packageJson);
      }
    }

    return Promise.resolve(children);
  }


  getPackage(packageJson: GetPackageJsonResult, dependencyType: Package): PackageListChildren {
    const { data, error } = packageJson;

    if (!error && data !== null) {
      const dependency: DependencyType = data[dependencyType.label];

      if (dependency) {
        return [
          ...Object.keys(dependency)
            .sort()
            .map((dep: string) => {
              const version: string = dependency[dep];

              return new Package(
                dep,
                version,
                this.context.extensionPath,
                vscode.TreeItemCollapsibleState.None,
                {
                  command: CMD_DISPLAY_PACKAGE,
                  title: '',
                  arguments: [dep, version],
                }
              );
            })
        ];
      }
    }

    return [];
  }


  getDependency(packageJson: GetPackageJsonResult): PackageListChildren {
    const { data, error } = packageJson;

    if (error) {
      return [
        new Dependency(
          t('treeViews.package.readError'),
          -1,
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      ];
    } else if (data === null) {
        return [
          new Dependency(
            t('treeViews.package.npPkgJson'),
            -1,
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None
          )
        ];
    } else {
      return [
        ...Object.keys(extViews)
        .sort()
        .reduce((allTypes: PackageListChildren, depType: string): PackageListChildren => {
          let depCount = 0;
  
          if (data[depType] !== undefined) {
            depCount = Object.keys(data[depType]).length;
          }
  
          if (depCount > 0) {
            return [...allTypes, new Dependency(
              depType,
              depCount,
              this.context.extensionPath,
              vscode.TreeItemCollapsibleState.Expanded
            )];
          }
  
          return [...allTypes];
        }, [])
      ];
    }
  }
}
