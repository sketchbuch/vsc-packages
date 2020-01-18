import * as vscode from 'vscode';
import {
  CMD_VSCODE_OPEN_WV,
  EXT_GLOBALSTATE_KEY,
  FS_FOLDER_CSS,
  FS_FOLDER_JS,
  EXT_GLOBALSTATE_VERSION_KEY,
} from '../../constants';
import { getNpmPackageData, getPackageTabTitle, getResourceUri } from '../../utils';
import { getTemplate, getHtml } from '../../templates/package';
import { NpmPackageData, PackageState, TabboxId, TabMessage, CmdCallbackData } from '../../types';

export const defaultPackageData: CmdCallbackData = { packageName: '' };

export class Package {
  private _disposables: vscode.Disposable[] = [];
  private readonly _extensionPath: string;
  private readonly _panel: vscode.WebviewPanel;
  private static state: PackageState = {
    data: undefined,
    error: undefined,
  };
  public static currentPackageData: CmdCallbackData = { ...defaultPackageData };
  public static currentPanel: Package | undefined;
  public static activeTab: TabboxId = 'readme';
  public static readonly viewType = CMD_VSCODE_OPEN_WV;

  public constructor(
    packageData: CmdCallbackData,
    panel: vscode.WebviewPanel,
    context: vscode.ExtensionContext
  ) {
    this._panel = panel;
    this._extensionPath = context.extensionPath;
    this._panel.webview.onDidReceiveMessage(
      (message: TabMessage) => {
        Package.activeTab = message.activeTab;
        Package.updatePanelContent(packageData, this);
      },
      undefined,
      context.subscriptions
    );

    this._update(packageData, context, true);

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.onDidChangeViewState(
      () => {
        if (this._panel.visible) {
          this._update(Package.currentPackageData, context);
        }
      },
      null,
      this._disposables
    );
  }

  private static updatePackageAndPanel(
    packageData: CmdCallbackData,
    panel?: vscode.WebviewPanel,
    context?: vscode.ExtensionContext
  ) {
    Package.currentPackageData = packageData;

    if (panel && context) {
      Package.currentPanel = new Package(packageData, panel, context);
    }
  }

  private static loadPanelContent(packageData: CmdCallbackData, currentPanel: Package) {
    Package.state = {
      data: undefined,
      error: undefined,
    };
    Package.activeTab = 'readme';
    Package.updatePanelContent(packageData, currentPanel);

    getNpmPackageData(packageData.packageName)
      .then((data: NpmPackageData) => {
        Package.state.data = data;
        Package.updatePanelContent(packageData, currentPanel);
      })
      .catch((error: Error) => {
        Package.state.error = error;
        Package.updatePanelContent(packageData, currentPanel);
      });
  }

  private static updatePanelContent(packageData: CmdCallbackData, currentPanel: Package) {
    currentPanel._panel.title = getPackageTabTitle(packageData.packageName);
    currentPanel._panel.webview.html = currentPanel._getHtmlForWebview(packageData, Package.state);
  }

  /*
    Called in cmdDisplayPackage() when an item in the side bar is clicked on.
  */
  public static createOrShow(packageData: CmdCallbackData, context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    Package.setStateForRevival(packageData, context);

    if (Package.currentPanel) {
      if (packageData.packageName !== Package.currentPackageData.packageName) {
        Package.updatePackageAndPanel(packageData);
        Package.loadPanelContent(packageData, Package.currentPanel);
        Package.currentPanel._panel.reveal(column);
      }
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      Package.viewType,
      getPackageTabTitle(packageData.packageName),
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          getResourceUri(context.extensionPath, FS_FOLDER_CSS),
          getResourceUri(context.extensionPath, FS_FOLDER_JS),
        ],
      }
    );

    Package.updatePackageAndPanel(packageData, panel, context);
  }

  /*
    Called in registerWebviews() during deserialization to recreate the panel on startup.
  */
  public static revive(
    packageData: CmdCallbackData,
    panel: vscode.WebviewPanel,
    context: vscode.ExtensionContext
  ) {
    Package.setStateForRevival(packageData, context);
    Package.updatePackageAndPanel(packageData, panel, context);
  }

  /*
    The state set here is used in registerWebviews() to enable revival.
  */
  public static setStateForRevival(
    { packageName, packageVersion }: CmdCallbackData,
    context: vscode.ExtensionContext
  ) {
    context.globalState.update(EXT_GLOBALSTATE_KEY, packageName);
    context.globalState.update(EXT_GLOBALSTATE_VERSION_KEY, packageVersion);
  }

  private _getHtmlForWebview(packageData: CmdCallbackData, state: PackageState) {
    return getHtml({
      extensionPath: this._extensionPath,
      getTemplate,
      htmlData: {
        activeTab: Package.activeTab,
        packageData,
        state,
      },
    });
  }

  private _update(
    packageData: CmdCallbackData,
    context: vscode.ExtensionContext,
    isConstructionUpdate: boolean = false
  ) {
    if (
      isConstructionUpdate ||
      packageData.packageName !== Package.currentPackageData.packageName
    ) {
      Package.setStateForRevival(packageData, context);
      Package.loadPanelContent(packageData, this);
    }
  }

  public dispose() {
    Package.currentPanel = undefined;
    Package.currentPackageData = { ...defaultPackageData };

    this._panel.dispose();
    this._disposables.forEach((disposable: vscode.Disposable) => {
      disposable.dispose();
    });
  }
}
