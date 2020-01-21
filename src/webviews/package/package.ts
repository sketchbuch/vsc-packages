import * as vscode from 'vscode';
import {
  CMD_DISPLAY_PACKAGE_WV,
  EXT_GLOBALSTATE_KEY,
  EXT_GLOBALSTATE_VERSION_KEY,
  FS_FOLDER_CSS,
  FS_FOLDER_JS,
} from '../../constants';
import {
  CmdCallbackData,
  NpmPackageData,
  PackageData,
  PackageHtmlData,
  PackagePmPayload,
  PackageState,
  PostMessage,
  WebView,
} from '../../types';
import { defaultTemplate as template } from '../../templates/package';
import { getHtml } from '../../templates';
import { getResourceUri, getPackageTabTitle, getNpmPackageData } from '../../utils';

export const pkg = (): WebView<PackageData> => {
  const disposables: vscode.Disposable[] = [];
  const viewType = CMD_DISPLAY_PACKAGE_WV;
  const state: PackageState = {
    activeTab: 'readme',
    data: undefined,
    error: undefined,
  };
  const packageData: CmdCallbackData = {
    packageName: '',
    packageVersion: '',
  };
  let curContext: vscode.ExtensionContext;
  let curPanel: undefined | vscode.WebviewPanel = undefined;

  const createPanel = (): void => {
    curPanel = vscode.window.createWebviewPanel(
      viewType,
      getPackageTabTitle(packageData.packageName),
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
        (message: PostMessage<PackagePmPayload>) => {
          switch (message.action) {
            case 'display-package':
            default:
              state.activeTab = message.payload.activeTab;
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
    state.activeTab = 'readme';
    state.data = undefined;
    state.error = undefined;

    updatePanelContent();

    getNpmPackageData(packageData.packageName)
      .then((data: NpmPackageData) => {
        state.data = data;
        updatePanelContent();
      })
      .catch((error: Error) => {
        state.error = error;
        updatePanelContent();
      });
  };

  const setStateForRevival = (): void => {
    curContext.globalState.update(EXT_GLOBALSTATE_KEY, packageData.packageName);
    curContext.globalState.update(EXT_GLOBALSTATE_VERSION_KEY, packageData.packageVersion);
  };

  const update = (): void => {
    setStateForRevival();
    loadPanelContent();
  };

  const updatePanelContent = (): void => {
    if (curPanel) {
      curPanel.title = getPackageTabTitle(packageData.packageName);
      curPanel.webview.html = getHtml<PackageHtmlData>({
        extensionPath: curContext.extensionPath,
        template,
        htmlData: {
          packageData,
          state,
        },
      });
    }
  };

  const webView: WebView<PackageData> = {
    getViewType: () => viewType,

    show: (context: vscode.ExtensionContext, data: PackageData): void => {
      const previousPackageName = packageData.packageName;

      curContext = context;
      packageData.packageName = data.packageName;
      packageData.packageVersion = data.packageVersion;

      setStateForRevival();

      if (curPanel === undefined) {
        createPanel();
      }

      if (curPanel) {
        if (packageData.packageName !== previousPackageName) {
          const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

          loadPanelContent();
          curPanel.reveal(column);
        }
      }
    },

    revive: (
      context: vscode.ExtensionContext,
      revivedPanel: vscode.WebviewPanel,
      data: PackageData
    ): void => {
      curContext = context;
      curPanel = revivedPanel;
      packageData.packageName = data.packageName;
      packageData.packageVersion = data.packageVersion;

      setupPanel();
    },
  };

  return webView;
};

export const packageWebview = pkg();
