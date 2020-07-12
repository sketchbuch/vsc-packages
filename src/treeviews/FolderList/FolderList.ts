import { t } from 'vscode-ext-localisation';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { CMD_SELECT_FOLDER, FS_PACKAGEJSON } from '../../constants';
import { FolderItem } from '.';
import { getPackageJson } from '../../utils';
import { GetPackageJsonResult } from '../../types';
import { VsCodeWsFolders, WsFolder, WsFolders } from './FolderList.interface';
import { convertWsFolders } from './helpers/convertWsFolders';

export class FolderList implements vscode.TreeDataProvider<FolderItem> {
  _onDidChangeTreeData: vscode.EventEmitter<FolderItem | undefined> = new vscode.EventEmitter<
    FolderItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<FolderItem | undefined> = this._onDidChangeTreeData.event;
  
  private packageJsons: {
    [key: string]: GetPackageJsonResult
  } = {};
  private watchers: string[] = [];
  private workspaceFolders: WsFolders;

  constructor(
    workspaceFolders: VsCodeWsFolders,
    private context: vscode.ExtensionContext
  ) {
    this.workspaceFolders = this.collectFolders(convertWsFolders(workspaceFolders));

    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      this.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
    });
  }

  collectFolders(workspaceFolders: WsFolders): WsFolders {
    return workspaceFolders.reduce((allFolders: WsFolders, folder: WsFolder): WsFolders => {
      this.createWatcher(folder);
      let folders = [folder];
  
      if (this.packageJsons[folder.name] === undefined) {
        this.packageJsons[folder.name] = getPackageJson(folder);
        const { data, error } = this.packageJsons[folder.name];

        if (!error && data !== null && data.workspaces) {
          data.workspaces.forEach((workspace: string) => {
            const wsFolder = path.join(folder.uri.fsPath, workspace);
            
            if (wsFolder.slice(-2) === '/*') {
              const wildCardFolder = wsFolder.substring(0, wsFolder.length - 2);
              const filenames = fs.readdirSync(wildCardFolder);

              folders = filenames.reduce((allFolders: WsFolders, curFilename: string): WsFolders => {
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
              }, folders);
            } else {
              try {
                if (fs.lstatSync(wsFolder).isDirectory()) {
                  const newFolder = this.getWsFolder(wsFolder.replace(folder.uri.path, '').slice(1), wsFolder, folder);
                  folders = [...folders, newFolder];
                  this.createWatcher(newFolder);
                }
              } catch {
                // Do nothing...
              }
            }
          });
        }

      }

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
  
  getParent?(element: FolderItem): vscode.ProviderResult<FolderItem> {
    return null;
  }

  getTreeItem(element: FolderItem): vscode.TreeItem {
    return element;
  }

  getWsFolder(name: string, folderPath: string, parentFolder: WsFolder): WsFolder {
    return {
      name,
      parent: parentFolder.name, 
      uri: vscode.Uri.file(folderPath)
    };
  }

  hasChildern(folderName: string): boolean {
    return this.workspaceFolders.some((f) => f.parent === folderName);
  }

  isChildOfParent(parentFolderName: string, folder: WsFolder): boolean {
    return !this.isParent(folder) && folder.parent === parentFolderName;
  }

  isParent(folder: WsFolder): boolean {
    return !folder.parent;
  }

  refresh(workspaceFolders: WsFolders): void {
    this.workspaceFolders = this.collectFolders(workspaceFolders);
    this.packageJsons = {};
    this._onDidChangeTreeData.fire(undefined);
  }

  getChildren(parent?: FolderItem): Thenable<FolderItem[]> {
    const children: FolderItem[] = [];
    
    if (this.workspaceFolders && this.workspaceFolders.length > 0) {
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
            let expandedState = vscode.TreeItemCollapsibleState.None;

            if (this.hasChildern(folder.name)) {
              expandedState = vscode.TreeItemCollapsibleState.Expanded;
            }

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
        new FolderItem(
          t('treeViews.folder.noFolders'),
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    }

    return Promise.resolve(children);
  }
}
