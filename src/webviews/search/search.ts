import * as vscode from 'vscode';
import { CMD_SEARCH_PACKAGES_WV, FS_FOLDER_CSS, FS_FOLDER_JS } from '../../constants';
import { defaultTemplate as template } from '../../templates/search';
import { getHtml } from '../../templates';
import { getResourceUri } from '../../utils';
import { PostMessage, SearchHtmlData, SearchPmPayload, SearchState, WebView } from '../../types';

export const search = (): WebView<{}> => {
  const disposables: vscode.Disposable[] = [];
  const viewType = CMD_SEARCH_PACKAGES_WV;
  const state: SearchState = {
    term: '',
  };
  let curContext: vscode.ExtensionContext;
  let curPanel: undefined | vscode.WebviewPanel = undefined;

  const createPanel = (): void => {
    curPanel = vscode.window.createWebviewPanel(
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

    setupPanel();
  };

  const setupPanel = (): void => {
    if (curPanel) {
      curPanel.webview.onDidReceiveMessage(
        (message: PostMessage<SearchPmPayload>) => {
          switch (message.action) {
            case 'search':
            default:
              state.term = message.payload.term;
              break;
          }

          updatePanelContent();
        },
        undefined,
        curContext.subscriptions
      );

      update();

      curPanel.onDidDispose(dispose, null, disposables);
      curPanel.onDidChangeViewState(
        () => {
          if (curPanel && curPanel.visible) {
            update();
          }
        },
        null,
        disposables
      );
    }
  };

  const dispose = (): void => {
    if (curPanel) {
      curPanel.dispose();
      curPanel = undefined;
    }

    disposables.forEach((disposable: vscode.Disposable) => {
      disposable.dispose();
    });
  };

  const loadPanelContent = (): void => {
    updatePanelContent();
  };

  const update = (): void => {
    loadPanelContent();
  };

  const updatePanelContent = (): void => {
    if (curPanel) {
      curPanel.webview.html = getHtml<SearchHtmlData>({
        extensionPath: curContext.extensionPath,
        template,
        htmlData: {
          state,
        },
      });
    }
  };

  const webView: WebView<{}> = {
    getViewType: () => viewType,

    show: (context: vscode.ExtensionContext, data: {}): void => {
      curContext = context;

      if (curPanel === undefined) {
        createPanel();
      }

      if (curPanel) {
        const column = vscode.window.activeTextEditor
          ? vscode.window.activeTextEditor.viewColumn
          : undefined;

        loadPanelContent();
        curPanel.reveal(column);
      }
    },

    revive: (
      context: vscode.ExtensionContext,
      revivedPanel: vscode.WebviewPanel,
      data: {}
    ): void => {
      curContext = context;
      curPanel = revivedPanel;

      setupPanel();
    },
  };

  return webView;
};

export const searchWebview = search();
