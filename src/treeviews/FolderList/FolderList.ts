import * as vscode from 'vscode';
import { FolderListItem } from '.';
import { CMD_SELECT_FOLDER, FS_PACKAGEJSON } from '../../constants';
import { getPackageJson } from '../../utils';

export class FolderList implements vscode.TreeDataProvider<FolderListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<FolderListItem | undefined> = new vscode.EventEmitter<
    FolderListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<FolderListItem | undefined> = this._onDidChangeTreeData.event;

  private watchers: string[] = [];

  constructor(
    private workspaceFolders: vscode.WorkspaceFolder[],
    private context: vscode.ExtensionContext
  ) {}

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

  getTreeItem(element: FolderListItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<FolderListItem> {
    return null;
  }

  getChildren(): Thenable<FolderListItem[]> {
    const children: FolderListItem[] = [];

    this.workspaceFolders.forEach((folder: vscode.WorkspaceFolder) => {
      const packageJson = getPackageJson(folder);

      this.createWatcher(folder);

      if (!(packageJson instanceof Error) && packageJson !== null) {
        const folderItem = new FolderListItem(
          folder.name,
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None,
          {
            command: CMD_SELECT_FOLDER,
            title: '',
            arguments: [folder, this.context],
          }
        );
        children.push(folderItem);
      }
    });

    return Promise.resolve(children);
  }
}
