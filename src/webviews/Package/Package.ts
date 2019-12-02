import * as path from 'path';
import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN_WV } from '../../constants';
import { getPackageTabTitle, getNonce } from '../../utils';

class Package {
  private _disposables: vscode.Disposable[] = [];
  private readonly _extensionPath: string;
  private readonly _panel: vscode.WebviewPanel;
  public static currentPanel: Package | undefined;
  public static readonly viewType = CMD_VSCODE_OPEN_WV;

  private constructor(panel: vscode.WebviewPanel, extensionPath: string, packageName: string = '') {
    this._panel = panel;
    this._extensionPath = extensionPath;

    this._update(packageName);
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.onDidChangeViewState(
      () => {
        if (this._panel.visible) {
          this._update(packageName);
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    Package.currentPanel = undefined;
    this._panel.dispose();

    this._disposables.forEach((disposable: vscode.Disposable) => {
      disposable.dispose();
    });
  }

  private _update(packageName: string) {
    const webview = this._panel.webview;
    this._panel.webview.html = this._getHtmlForWebview(webview, packageName);

    if (packageName) {
      this._panel.title = getPackageTabTitle(packageName);
    }
  }

  public static revive(panel: vscode.WebviewPanel, extensionPath: string) {
    Package.currentPanel = new Package(panel, extensionPath);
  }

  public static createOrShow(extensionPath: string, packageName: string) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (Package.currentPanel) {
      Package.currentPanel._panel.title = getPackageTabTitle(packageName);
      Package.currentPanel._panel.webview.html = Package.currentPanel._getHtmlForWebview(
        Package.currentPanel._panel.webview,
        packageName
      );
      Package.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      Package.viewType,
      getPackageTabTitle(packageName),
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'media'))],
      }
    );

    Package.currentPanel = new Package(panel, extensionPath, packageName);
  }

  private _getHtmlForWebview(webview: vscode.Webview, packageName: string) {
    const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'media', 'main.js'));
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
    const nonce = getNonce();

    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <!--
                Use a content security policy to only allow loading images from https or from our extension directory,
                and only allow scripts that have a specific nonce.
                -->
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${packageName}</title>
            </head>
            <body>
                <h1 id="lines-of-code-counter">${packageName}</h1>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
  }
}

export default Package;
