import * as vscode from 'vscode';
import {
  EXT_FOLDERLIST_ITEM_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../constants';
import { getImagePath } from '../../utils';

export class FolderListItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `View packages for "${this.label}"`;
  }

  get description(): string {
    return '';
  }

  iconPath = {
    light: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_LIGHT, 'folder-light.svg'),
    dark: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_DARK, 'folder-dark.svg'),
  };

  contextValue = EXT_FOLDERLIST_ITEM_CTX;
}
