import * as vscode from 'vscode';
import { CMD_SEARCH_PACKAGES_WV, FS_FOLDER_CSS, FS_FOLDER_JS } from '../../constants';
import { defaultTemplate as template } from '../../templates/search';
import { getHtml } from '../../templates';
import { getResourceUri } from '../../utils';
import { WebView, SearchHtmlData, SearchState, PostMessage } from '../../types';

export const search = (): WebView => {
  const disposables: vscode.Disposable[] = [];
  const viewType = CMD_SEARCH_PACKAGES_WV;
  const state: SearchState = {
    data: undefined,
    error: undefined,
    term: '',
  };
  let curContext: vscode.ExtensionContext;
  let panel: undefined | vscode.WebviewPanel = undefined;

  const createPanel = (): void => {
    panel = vscode.window.createWebviewPanel(
      viewType,
      'Packages: Search',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          getResourceUri(curContext.extensionPath, FS_FOLDER_CSS),
          getResourceUri(curContext.extensionPath, FS_FOLDER_JS),
        ],
      }
    );

    panel.webview.onDidReceiveMessage(
      (message: PostMessage) => {
        switch (message.action) {
          case 'search':
          default:
            state.term = message.payload;
            break;
        }
      },
      undefined,
      curContext.subscriptions
    );

    update();

    panel.onDidDispose(dispose, null, disposables);
    panel.onDidChangeViewState(
      () => {
        if (panel && panel.visible) {
          update();
          updatePanelContent();
        }
      },
      null,
      disposables
    );
  };

  const dispose = (): void => {
    if (panel) {
      panel.dispose();
      panel = undefined;
    }

    disposables.forEach((disposable: vscode.Disposable) => {
      disposable.dispose();
    });
  };

  const loadPanelContent = (): void => {
    updatePanelContent();
    setTimeout(() => {
      state.data = {};
      updatePanelContent();
    }, 2000);
  };

  const setStateForRevival = (): void => {};

  const update = (): void => {
    setStateForRevival();
    loadPanelContent();
  };

  const updatePanelContent = (): void => {
    if (panel) {
      console.log('### updatePanelContent()', state.term);
      panel.webview.html = getHtml<SearchHtmlData>({
        extensionPath: curContext.extensionPath,
        template,
        htmlData: {
          state,
        },
      });
    }
  };

  const webView: WebView = {
    show: (context: vscode.ExtensionContext): void => {
      curContext = context;

      if (panel === undefined) {
        createPanel();
      }

      if (panel) {
        const column = vscode.window.activeTextEditor
          ? vscode.window.activeTextEditor.viewColumn
          : undefined;
        panel.reveal(column);
      }
    },

    revive: (context: vscode.ExtensionContext): void => {
      curContext = context;
    },
  };

  return webView;
};

export const searchWebview = search();
