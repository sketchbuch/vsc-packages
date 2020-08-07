import * as vscode from 'vscode';
import {
  EXT_FOLDERLIST_ITEM_LOADING_CTX,
  FS_FOLDER_IMAGES_LIGHT,
  FS_FOLDER_IMAGES_DARK,
} from '../../../constants';
import { getImagePath } from '../../../utils';

export class FolderLoading extends vscode.TreeItem {
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
    light: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_LIGHT, 'loading.svg'),
    dark: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_DARK, 'loading.svg'),
  };

  contextValue = EXT_FOLDERLIST_ITEM_LOADING_CTX;
}
