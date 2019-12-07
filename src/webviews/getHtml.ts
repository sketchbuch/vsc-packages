import * as path from 'path';
import * as vscode from 'vscode';
import { GetHtml } from '../types';
import { getNonce } from '../utils';

const getHtml = ({ extensionPath, getTemplate, packageName, webview }: GetHtml): string => {
  const scriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, 'media', 'main.js'));
  const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
  const nonce = getNonce();

  return getTemplate({
    packageName,
    nonce,
    scriptUri,
  });
};

export default getHtml;
