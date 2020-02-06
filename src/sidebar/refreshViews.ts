/* import * as vscode from 'vscode'; */
import { ExtViews, /* GetPackageJsonResult */ TreeProviders } from '../types';
/* import { getPackageJson } from '../utils';
import { setViewContext } from './'; */

export const refreshViews = (extViews: ExtViews, treeProviders: TreeProviders): void => {
  /* const packageJson: GetPackageJsonResult = getPackageJson(vscode.workspace.workspaceFolders);

  Object.keys(extViews).forEach(view => {
    setViewContext(view, packageJson);
    if (treeProviders[view]) {
      treeProviders[view].refresh(packageJson);
    }
  }); */
};
