import * as vscode from 'vscode';
import { CMD_SEARCH_PACKAGES_WV, FS_FOLDER_CSS, FS_FOLDER_JS } from '../../constants';
import { getResourceUri } from '../../utils';
import { SearchWebView } from '../../types';

export const search = (): SearchWebView => {
  const newSearch: SearchWebView = {
    viewType: CMD_SEARCH_PACKAGES_WV,
    panel: undefined,

    createOrShow: (context: vscode.ExtensionContext): void => {
      if (newSearch.panel !== undefined) {
        const column = vscode.window.activeTextEditor
          ? vscode.window.activeTextEditor.viewColumn
          : undefined;
        newSearch.panel.reveal(column);

        return;
      }

      vscode.window.createWebviewPanel(
        newSearch.viewType,
        'Packages: Search',
        vscode.ViewColumn.Active,
        {
          enableScripts: true,
          localResourceRoots: [
            getResourceUri(context.extensionPath, FS_FOLDER_CSS),
            getResourceUri(context.extensionPath, FS_FOLDER_JS),
          ],
        }
      );
    },

    dispose: (): void => {},

    getHtmlForWebview: (): void => {},

    revive: (context: vscode.ExtensionContext): void => {},

    update: (): void => {},
  };

  return newSearch;
};

export const searchWebview = search();
