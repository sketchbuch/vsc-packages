import * as vscode from 'vscode';
import { FolderListItem } from '.';
import { CMD_SELECT_FOLDER } from '../../constants';

export class FolderList implements vscode.TreeDataProvider<FolderListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<FolderListItem | undefined> = new vscode.EventEmitter<
    FolderListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<FolderListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(
    private workspaceFolders: vscode.WorkspaceFolder[],
    private context: vscode.ExtensionContext
  ) {}

  refresh(): void {}

  getTreeItem(element: FolderListItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<FolderListItem> {
    return null;
  }

  getChildren(): Thenable<FolderListItem[]> {
    const children: FolderListItem[] = [];

    this.workspaceFolders.forEach((folder: vscode.WorkspaceFolder) => {
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
    });

    return Promise.resolve(children);
  }
}
