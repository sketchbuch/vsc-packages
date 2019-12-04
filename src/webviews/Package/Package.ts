import * as path from 'path';
import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN_WV, EXT_GLOBALSTATE_KEY } from '../../constants';
import { getPackageTabTitle, getNonce } from '../../utils';

class Package {
  private _disposables: vscode.Disposable[] = [];
  private readonly _extensionPath: string;
  private readonly _panel: vscode.WebviewPanel;
  public static currentPanel: Package | undefined;
  public static currentPackage: string = '';
  public static readonly viewType = CMD_VSCODE_OPEN_WV;

  public constructor(
    packageName: string,
    panel: vscode.WebviewPanel,
    context: vscode.ExtensionContext
  ) {
    this._panel = panel;
    this._extensionPath = context.extensionPath;

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

  private static updatePanelContent(packageName: string, currentPanel: Package) {
    currentPanel._panel.title = getPackageTabTitle(packageName);
    currentPanel._panel.webview.html = currentPanel._getHtmlForWebview(
      currentPanel._panel.webview,
      packageName
    );
  }

  /*
    Called in cmdDisplayPackage() when an item in the side bar is clicked on.
  */
  public static createOrShow(packageName: string, context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    Package.setStateForRevival(context, packageName);

    if (Package.currentPanel) {
      if (packageName !== Package.currentPackage) {
        Package.updatePackageAndPanel(packageName);
        Package.updatePanelContent(packageName, Package.currentPanel);
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
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))],
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
    Package.setStateForRevival(context, packageName);
    Package.updatePackageAndPanel(packageName, panel, context);
  }

  /*
    The state set here is used in registerWebviews() to enable revival.
  */
  public static setStateForRevival(context: vscode.ExtensionContext, packageName: string) {
    context.globalState.update(EXT_GLOBALSTATE_KEY, packageName);
  }

  private _getHtmlForWebview(webview: vscode.Webview, packageName: string) {
    const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'media', 'main.js'));
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
    const nonce = getNonce();

    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${packageName}</title>
            </head>
            <body>
                <h1 id="vsc-package-name">${packageName}</h1>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
  }

  private _update(
    packageName: string,
    context: vscode.ExtensionContext,
    isConstructionUpdate: boolean = false
  ) {
    if (isConstructionUpdate || packageName !== Package.currentPackage) {
      Package.setStateForRevival(context, packageName);
      Package.updatePanelContent(packageName, this);
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
