import * as vscode from 'vscode';
import * as path from 'path';
import {
  EXT_PACKAGELIST_ITEM_CTX,
  FS_FOLDER_IMAGES,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
  FS_FOLDER_RESOURCES,
} from '../../constants';

class PackageListItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly version: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label} (${this.version})`;
  }

  get description(): string {
    return `${this.version}`;
  }

  iconPath = {
    light: path.join(
      this.extensionPath,
      FS_FOLDER_RESOURCES,
      FS_FOLDER_IMAGES,
      FS_FOLDER_IMAGES_LIGHT,
      'activitybar-light.svg'
    ),
    dark: path.join(
      this.extensionPath,
      FS_FOLDER_RESOURCES,
      FS_FOLDER_IMAGES,
      FS_FOLDER_IMAGES_DARK,
      'activitybar-dark.svg'
    ),
  };

  contextValue = EXT_PACKAGELIST_ITEM_CTX;
}

export default PackageListItem;
