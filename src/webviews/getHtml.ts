import * as path from 'path';
import * as vscode from 'vscode';
import { GetHtml } from '../types';
import { getNonce } from '../utils';
import {
  FS_FOLDER_CSS,
  FS_FOLDER_JS,
  FS_FOLDER_RESOURCES,
  FS_WEBVIEW_PACKAGE_CSS,
  FS_WEBVIEW_PACKAGE_JS,
} from '../constants';

const getHtml = ({ extensionPath, getTemplate, packageName, webview }: GetHtml): string => {
  const scriptPath = vscode.Uri.file(
    path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS, FS_WEBVIEW_PACKAGE_JS)
  );
  const cssPath = vscode.Uri.file(
    path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS, FS_WEBVIEW_PACKAGE_CSS)
  );

  return getTemplate({
    cssUri: webview.asWebviewUri(cssPath),
    packageName,
    nonce: getNonce(),
    scriptUri: webview.asWebviewUri(scriptPath),
  });
};

export default getHtml;
