import * as vscode from 'vscode';
import {
  EXT_PACKAGELIST_DEP_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../constants';
import { getImagePath } from '../../utils';

export class PackageListDep extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly depCount: number,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    if (this.depCount >= 0) {
      return `${this.label} (${this.depCount})`;
    }

    return this.label;
  }

  get description(): string {
    if (this.depCount >= 0) {
      return `(${this.depCount})`;
    }

    return '';
  }

  iconPath =
    this.depCount >= 0
      ? {
          light: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_LIGHT, 'dep-type-light.svg'),
          dark: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_DARK, 'dep-type-dark.svg'),
        }
      : undefined;

  contextValue = EXT_PACKAGELIST_DEP_CTX;
}
