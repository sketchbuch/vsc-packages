import * as path from 'path';
import * as vscode from 'vscode';
import { GetHtml } from '../types';
import { getNonce } from '../utils';
import { FS_FOLDER_JS, FS_FOLDER_RESOURCES } from '../constants';

const getHtml = ({ extensionPath, getTemplate, packageName, webview }: GetHtml): string => {
  const scriptPathOnDisk = vscode.Uri.file(
    path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS, 'webview-package.js')
  );
  const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
  const nonce = getNonce();

  return getTemplate({
    packageName,
    nonce,
    scriptUri,
  });
};

export default getHtml;
