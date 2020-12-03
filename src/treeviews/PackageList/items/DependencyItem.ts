import * as vscode from 'vscode';
import {
  EXT_PACKAGELIST_DEP_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../../constants';
import { getImagePath } from '../../../utils';

export class DependencyItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly depCount: number,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    const hasDeps = depCount >= 0;
    this.tooltip = hasDeps ? `${this.label} (${this.depCount})` : this.label;
    this.description = hasDeps ? `(${this.depCount})` : '';
    this.iconPath = hasDeps
      ? {
          light: getImagePath(extensionPath, FS_FOLDER_IMAGES_LIGHT, 'dep-type-light.svg'),
          dark: getImagePath(extensionPath, FS_FOLDER_IMAGES_DARK, 'dep-type-dark.svg'),
        }
      : undefined;
  }

  contextValue = EXT_PACKAGELIST_DEP_CTX;
}
