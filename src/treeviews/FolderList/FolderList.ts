import { t } from 'vscode-ext-localisation';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { CMD_SELECT_FOLDER, FS_PACKAGEJSON } from '../../constants';
import { FolderEmpty, FolderItem, FolderLoading } from '.';
import { getPackageJson, sortWsFolders } from '../../utils';
import {
  FolderListChild,
  FolderListChildren,
  VsCodeWsFolders,
  WsFolder,
  WsFolders,
} from './FolderList.interface';
import { convertWsFolders } from './helpers/convertWsFolders';

export class FolderList implements vscode.TreeDataProvider<FolderListChild> {
  _onDidChangeTreeData: vscode.EventEmitter<FolderListChild | undefined> = new vscode.EventEmitter<
    FolderListChild | undefined
  >();
  onDidChangeTreeData: vscode.Event<FolderListChild | undefined> = this._onDidChangeTreeData.event;

  private loading = true;
  private watchers: string[] = [];
  private workspaceFolders: WsFolders;

  constructor(workspaceFolders: VsCodeWsFolders, private context: vscode.ExtensionContext) {
    this.workspaceFolders = this.collectFolders(convertWsFolders(workspaceFolders));
    this.loading = false;

    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      this.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
    });
  }

  collectFolders(workspaceFolders: WsFolders): WsFolders {
    return workspaceFolders.reduce((allFolders: WsFolders, folder: WsFolder): WsFolders => {
      this.createWatcher(folder);
      const { data, error } = getPackageJson(folder);
      let folders = [folder];
      let subFolders: WsFolder[] = [];

      if (!error && data !== null && data.workspaces) {
        data.workspaces.forEach((workspace: string): void => {
          const wsFolder = path.join(folder.uri.fsPath, workspace);

          if (this.isWildcardFolder(wsFolder)) {
            const wildCardFolder = wsFolder.substring(0, wsFolder.length - 2);
            const filenames = fs.readdirSync(wildCardFolder);

            subFolders = filenames.reduce(
              (allFolders: WsFolders, curFilename: string): WsFolders => {
                try {
                  const wsSubFolder = path.join(wildCardFolder, curFilename);

                  if (fs.lstatSync(wsSubFolder).isDirectory()) {
                    const newFolder = this.getWsFolder(curFilename, wsSubFolder, folder);
                    this.createWatcher(newFolder);
                    return [...allFolders, newFolder];
                  }
                } catch {
                  // Do nothing...
                }

                return allFolders;
              },
              subFolders
            );
          } else {
            try {
              if (fs.lstatSync(wsFolder).isDirectory()) {
                const newFolder = this.getWsFolder(
                  wsFolder.replace(folder.uri.path, '').slice(1),
                  wsFolder,
                  folder
                );
                subFolders = [...subFolders, newFolder];
                this.createWatcher(newFolder);
              }
            } catch {
              // Do nothing...
            }
          }
        });
      }

      subFolders.sort(sortWsFolders);
      folders = [...folders, ...subFolders];

      return [...allFolders, ...folders];
    }, []);
  }

  createWatcher(folder: WsFolder): void {
    if (!this.watchers.includes(folder.name)) {
      const watcher = vscode.workspace.createFileSystemWatcher(
        `${folder.uri.fsPath}/${FS_PACKAGEJSON}`
      );

      watcher.onDidChange(() => {
        this.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
      });

      watcher.onDidDelete(() => {
        this.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
      });

      watcher.onDidCreate(() => {
        this.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
      });

      this.context.subscriptions.push(watcher);
      this.watchers.push(folder.name);
    }
  }

  getFolderCommand(folder: WsFolder): vscode.Command {
    return {
      command: CMD_SELECT_FOLDER,
      title: '',
      arguments: [folder, this.context],
    };
  }

  getParent(): vscode.ProviderResult<FolderListChild> {
    return null;
  }

  getTreeItem(element: FolderListChild): vscode.TreeItem {
    return element;
  }

  getWsFolder(name: string, folderPath: string, parentFolder: WsFolder): WsFolder {
    return {
      name,
      parent: parentFolder.name,
      uri: vscode.Uri.file(folderPath),
    };
  }

  hasChildern(folderName: string): boolean {
    return this.workspaceFolders.some(f => f.parent === folderName);
  }

  isChildOfParent(parentFolderName: string, folder: WsFolder): boolean {
    return !this.isParent(folder) && folder.parent === parentFolderName;
  }

  isParent(folder: WsFolder): boolean {
    return !folder.parent;
  }

  isWildcardFolder(wsFolder: string): boolean {
    return wsFolder.slice(-2) === '/*';
  }

  refresh(workspaceFolders: WsFolders): void {
    this.loading = true;
    this.workspaceFolders = this.collectFolders(workspaceFolders);
    this.loading = false;
    this._onDidChangeTreeData.fire(undefined);
  }

  getChildren(parent?: FolderListChild): Thenable<FolderListChildren> {
    const children: FolderListChildren = [];

    if (this.loading) {
      children.push(
        new FolderLoading(
          t('treeViews.folder.loading'),
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    } else if (this.workspaceFolders && this.workspaceFolders.length > 0) {
      if (parent) {
        this.workspaceFolders.forEach((folder: WsFolder) => {
          if (this.isChildOfParent(parent.label, folder)) {
            children.push(
              new FolderItem(
                folder.name,
                this.context.extensionPath,
                vscode.TreeItemCollapsibleState.None,
                this.getFolderCommand(folder)
              )
            );
          }
        });
      } else {
        this.workspaceFolders.forEach((folder: WsFolder) => {
          if (this.isParent(folder)) {
            const expandedState = this.hasChildern(folder.name)
              ? vscode.TreeItemCollapsibleState.Expanded
              : vscode.TreeItemCollapsibleState.None;

            children.push(
              new FolderItem(
                folder.name,
                this.context.extensionPath,
                expandedState,
                this.getFolderCommand(folder)
              )
            );
          }
        });
      }
    }

    if (children.length < 1) {
      children.push(
        new FolderEmpty(
          t('treeViews.folder.noFolders'),
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    }

    return Promise.resolve(children);
  }
}
