import * as vscode from 'vscode';
import * as path from 'path';

class PackageListItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
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
    light: path.join(__filename, '..', '..', '..', 'resources', 'light', 'activitybar-light.svg'),
    dark: path.join(__filename, '..', '..', '..', 'resources', 'dark', 'activitybar-dark.svg'),
  };

  contextValue = 'package-list-item';
}

export default PackageListItem;
