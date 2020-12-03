import * as vscode from 'vscode';
import {
  EXT_FOLDERLIST_ITEM_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../../constants';
import { getImagePath } from '../../../utils';

export class FolderItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = `View packages for "${this.label}"`;
    this.description = '';
    this.iconPath = {
      light: getImagePath(extensionPath, FS_FOLDER_IMAGES_LIGHT, 'folder-light.svg'),
      dark: getImagePath(extensionPath, FS_FOLDER_IMAGES_DARK, 'folder-dark.svg'),
    };
  }

  contextValue = EXT_FOLDERLIST_ITEM_CTX;
}
