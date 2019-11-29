import * as vscode from 'vscode';
import * as path from 'path';
import { EXT_PACKAGELIST_ITEM_CTX } from '../../constants';

class PackageListItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly version: string,
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
    light: path.join('../', '../', '../', 'resources', 'light', 'activitybar-light.svg'),
    dark: path.join('../', '../', '../', 'resources', 'dark', 'activitybar-dark.svg'),
  };

  contextValue = EXT_PACKAGELIST_ITEM_CTX;
}

export default PackageListItem;
