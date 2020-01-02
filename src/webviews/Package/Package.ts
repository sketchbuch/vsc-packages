import * as vscode from 'vscode';
import getTemplate from './templates/getTemplate';
import { getHtml } from '..';
import { getNpmPackageData, getPackageTabTitle, getResourceUri } from '../../utils';
import { NpmPackageData, PackageState } from '../../types';
import {
  CMD_VSCODE_OPEN_WV,
  EXT_GLOBALSTATE_KEY,
  FS_FOLDER_CSS,
  FS_FOLDER_JS,
} from '../../constants';

class Package {
  private _disposables: vscode.Disposable[] = [];
  private readonly _extensionPath: string;
  private readonly _panel: vscode.WebviewPanel;
  private static state: PackageState = {
    data: undefined,
    error: undefined,
  };
  public static currentPackage: string = '';
  public static currentPanel: Package | undefined;
  public static readonly viewType = CMD_VSCODE_OPEN_WV;

  public constructor(
    packageName: string,
    panel: vscode.WebviewPanel,
    context: vscode.ExtensionContext
  ) {
    this._panel = panel;
    this._extensionPath = context.extensionPath;
    this._panel.webview.onDidReceiveMessage(
      message => {
        console.log('### onDidReceiveMessage()', message);
      },
      undefined,
      context.subscriptions
    );

    this._update(packageName, context, true);

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.onDidChangeViewState(
      () => {
        if (this._panel.visible) {
          this._update(Package.currentPackage, context);
        }
      },
      null,
      this._disposables
    );
  }

  private static updatePackageAndPanel(
    packageName: string,
    panel?: vscode.WebviewPanel,
    context?: vscode.ExtensionContext
  ) {
    Package.currentPackage = packageName;

    if (panel && context) {
      Package.currentPanel = new Package(packageName, panel, context);
    }
  }

  private static loadPanelContent(packageName: string, currentPanel: Package) {
    Package.state = {
      data: undefined,
      error: undefined,
    };
    Package.updatePanelContent(packageName, currentPanel);

    getNpmPackageData(packageName)
      .then((data: NpmPackageData) => {
        Package.state.data = data;
        Package.updatePanelContent(packageName, currentPanel);
      })
      .catch((error: Error) => {
        Package.state.error = error;
        Package.updatePanelContent(packageName, currentPanel);
      });
  }

  private static updatePanelContent(packageName: string, currentPanel: Package) {
    currentPanel._panel.title = getPackageTabTitle(packageName);
    currentPanel._panel.webview.html = currentPanel._getHtmlForWebview(
      currentPanel._panel.webview,
      packageName,
      Package.state
    );
  }

  /*
    Called in cmdDisplayPackage() when an item in the side bar is clicked on.
  */
  public static createOrShow(packageName: string, context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    Package.setStateForRevival(packageName, context);

    if (Package.currentPanel) {
      if (packageName !== Package.currentPackage) {
        Package.updatePackageAndPanel(packageName);
        Package.loadPanelContent(packageName, Package.currentPanel);
        Package.currentPanel._panel.reveal(column);
      }
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      Package.viewType,
      getPackageTabTitle(packageName),
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          getResourceUri(context.extensionPath, FS_FOLDER_CSS),
          getResourceUri(context.extensionPath, FS_FOLDER_JS),
        ],
      }
    );

    Package.updatePackageAndPanel(packageName, panel, context);
  }

  /*
    Called in registerWebviews() during deserialization to recreate the panel on startup.
  */
  public static revive(
    packageName: string,
    panel: vscode.WebviewPanel,
    context: vscode.ExtensionContext
  ) {
    Package.setStateForRevival(packageName, context);
    Package.updatePackageAndPanel(packageName, panel, context);
  }

  /*
    The state set here is used in registerWebviews() to enable revival.
  */
  public static setStateForRevival(packageName: string, context: vscode.ExtensionContext) {
    context.globalState.update(EXT_GLOBALSTATE_KEY, packageName);
  }

  private _getHtmlForWebview(webview: vscode.Webview, packageName: string, state: PackageState) {
    return getHtml({
      extensionPath: this._extensionPath,
      getTemplate,
      htmlData: {
        packageName,
        state,
      },
    });
  }

  private _update(
    packageName: string,
    context: vscode.ExtensionContext,
    isConstructionUpdate: boolean = false
  ) {
    if (isConstructionUpdate || packageName !== Package.currentPackage) {
      Package.setStateForRevival(packageName, context);
      Package.loadPanelContent(packageName, this);
    }
  }

  public dispose() {
    Package.currentPanel = undefined;
    Package.currentPackage = '';

    this._panel.dispose();
    this._disposables.forEach((disposable: vscode.Disposable) => {
      disposable.dispose();
    });
  }
}

export default Package;
