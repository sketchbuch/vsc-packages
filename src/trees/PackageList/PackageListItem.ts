import * as vscode from 'vscode';
import * as path from 'path';

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
    light: path.join(__filename, '..', '..', '..', 'resources', 'light', 'activitybar-light.svg'),
    dark: path.join(__filename, '..', '..', '..', 'resources', 'dark', 'activitybar-dark.svg'),
  };

  contextValue = 'package-list-item';
}

export default PackageListItem;
