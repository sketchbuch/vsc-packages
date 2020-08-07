import * as vscode from 'vscode';
import { EXT_FOLDERLIST_ITEM_EMPTY_CTX } from '../../../constants';

export class FolderEmpty extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label}`;
  }

  get description(): string {
    return '';
  }

  iconPath = {
    light: '',
    dark: '',
  };

  contextValue = EXT_FOLDERLIST_ITEM_EMPTY_CTX;
}
