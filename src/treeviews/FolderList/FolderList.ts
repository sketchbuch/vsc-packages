import * as vscode from 'vscode';
import { CMD_SELECT_FOLDER } from '../../constants';
import { FolderListItem } from '.';
import { t } from 'vscode-ext-localisation';

export class FolderList implements vscode.TreeDataProvider<FolderListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<FolderListItem | undefined> = new vscode.EventEmitter<
    FolderListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<FolderListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(
    private workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined,
    private context: vscode.ExtensionContext
  ) {
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      this.refresh(vscode.workspace.workspaceFolders);
    });
  }

  refresh(workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined): void {
    this.workspaceFolders = workspaceFolders;
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: FolderListItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<FolderListItem> {
    return null;
  }

  getChildren(): Thenable<FolderListItem[]> {
    const children: FolderListItem[] = [];

    if (this.workspaceFolders && this.workspaceFolders.length > 0) {
      this.workspaceFolders.forEach((folder: vscode.WorkspaceFolder) => {
        children.push(
          new FolderListItem(
            folder.name,
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None,
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
        new FolderListItem(
          t('treeViews.folder.noFolders'),
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    }

    return Promise.resolve(children);
  }
}
