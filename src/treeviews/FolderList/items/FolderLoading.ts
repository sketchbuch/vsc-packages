import * as vscode from 'vscode';
import {
  EXT_FOLDERLIST_ITEM_LOADING_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../../constants';
import { getImagePath } from '../../../utils';

export class FolderLoading extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = this.label;
    this.description = '';
    this.iconPath = {
      light: getImagePath(extensionPath, FS_FOLDER_IMAGES_LIGHT, 'loading.svg'),
      dark: getImagePath(extensionPath, FS_FOLDER_IMAGES_DARK, 'loading.svg'),
    };
  }

  contextValue = EXT_FOLDERLIST_ITEM_LOADING_CTX;
}
