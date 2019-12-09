import * as path from 'path';
import * as vscode from 'vscode';
import { GetHtml } from '../types';
import { getNonce } from '../utils';
import { FS_FOLDER_CSS, FS_FOLDER_JS, FS_FOLDER_RESOURCES } from '../constants';

const getHtml = ({ extensionPath, getTemplate, packageName }: GetHtml): string => {
  const scriptPath = vscode.Uri.file(path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS))
    .with({ scheme: 'vscode-resource' })
    .toString(true);
  const cssPath = vscode.Uri.file(path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS))
    .with({ scheme: 'vscode-resource' })
    .toString(true);

  return getTemplate({
    cssPath,
    packageName,
    nonce: getNonce(),
    scriptPath,
  });
};

export default getHtml;
