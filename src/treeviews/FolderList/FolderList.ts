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
  
  private context: vscode.ExtensionContext;
  private packageJsons: {
    [key: string]: GetPackageJsonResult
  } = {};
  private watchers: string[] = [];
  private workspaceFolders: WsFolders;

  constructor(
    workspaceFolders: VsCodeWsFolders,
    context: vscode.ExtensionContext
  ) {
    this.context = context;
    this.workspaceFolders = convertWsFolders(workspaceFolders);

    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      this.refresh(convertWsFolders(vscode.workspace.workspaceFolders));
    });
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

  refresh(workspaceFolders: WsFolders, addToExisting: boolean = false): void {
    this.packageJsons = {};
    this.workspaceFolders = addToExisting ? [...this.workspaceFolders, ...workspaceFolders] : [...workspaceFolders];


    console.log('### this.workspaceFolders', this.workspaceFolders);
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: FolderItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<FolderItem> {
    return null;
  }

  getChildren(element?: FolderItem): Thenable<FolderItem[]> {
    const children: FolderItem[] = [];

    if (element) {
      console.log('### element', element.label);

      if (this.packageJsons[element.label] === undefined) {
        console.log('### element 2');
  
        /* this.packageJsons[element.name] = getPackageJson(folder);
        const { data, error } = this.packageJsons[folder.name];

        if (!error && data !== null && data.workspaces) {
          data.workspaces.forEach((workspace: string) => {
            const wsFolder = path.join(folder.uri.fsPath, workspace);

            console.log('### wsFolder', wsFolder);
            
            if (wsFolder.slice(-2) === '/*') {

            } else {}
          });
        } */
      }
    } else if (this.workspaceFolders && this.workspaceFolders.length > 0) {
      this.workspaceFolders.forEach((folder: WsFolder) => {
        let expandedState = vscode.TreeItemCollapsibleState.None;
        this.createWatcher(folder);
  
        if (this.packageJsons[folder.name] === undefined) {
          this.packageJsons[folder.name] = getPackageJson(folder);
          const { data, error } = this.packageJsons[folder.name];
          let subFolders: WsFolders = [];

          if (!error && data !== null && data.workspaces) {
            data.workspaces.forEach((workspace: string) => {
              const wsFolder = path.join(folder.uri.fsPath, workspace);
              
              if (wsFolder.slice(-2) === '/*') {
                const wildCardFolder = wsFolder.substring(0, wsFolder.length - 2);
                const filenames = fs.readdirSync(wildCardFolder);

                subFolders = filenames.reduce((allFolders: WsFolders, curFilename: string): WsFolders => {
                  try {
                    const wsSubFolder = path.join(wildCardFolder, curFilename);

                    if (fs.lstatSync(wsSubFolder).isDirectory()) {
                      return [...allFolders, {
                        name: curFilename,
                        parent: folder.uri.path,
                        uri: vscode.Uri.file(wsSubFolder)
                      }];
                    }
                  } catch {
                    // Do nothing...
                  }

                  return allFolders;
                }, subFolders);
              } else {
                try {
                  if (fs.lstatSync(wsFolder).isDirectory()) {
                    subFolders = [...subFolders, {
                      name: wsFolder.replace(folder.uri.path, '').slice(1),
                      parent: folder.uri.path, 
                      uri: vscode.Uri.file(wsFolder)
                    }];
                  }
                } catch {
                  // Do nothing...
                }
              }
            });
          }

          if (subFolders.length) {
            expandedState = vscode.TreeItemCollapsibleState.Expanded;
            this.refresh(subFolders, true);
          }
        }

        children.push(
          new FolderItem(
            folder.name,
            this.context.extensionPath,
            expandedState,
            {
              command: CMD_SELECT_FOLDER,
              title: '',
              arguments: [folder, this.context],
            }
          )
        );
      });
    } else {
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
