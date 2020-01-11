import * as vscode from 'vscode';
import Package from './Package/Package';
import { EXT_GLOBALSTATE_KEY, EXT_GLOBALSTATE_VERSION_KEY } from '../constants';

const registerWebviews = (context: vscode.ExtensionContext) => {
  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(Package.viewType, {
      async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
        Package.revive(
          {
            packageName: context.globalState.get(EXT_GLOBALSTATE_KEY) || '',
            packageVersion: context.globalState.get(EXT_GLOBALSTATE_VERSION_KEY) || '',
          },
          webviewPanel,
          context
        );
      },
    });
  }
};

export default registerWebviews;
