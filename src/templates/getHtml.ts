import { FS_FOLDER_CSS, FS_FOLDER_JS } from '../constants';
import { GetHtml } from '../types';
import { getNonce, getResourceUri } from '../utils';

export const getHtml = <T>({ extensionPath, template, htmlData }: GetHtml<T>): string => {
  const scriptPath = getResourceUri(extensionPath, FS_FOLDER_JS)
    .with({ scheme: 'vscode-resource' })
    .toString(true);
  const cssPath = getResourceUri(extensionPath, FS_FOLDER_CSS)
    .with({ scheme: 'vscode-resource' })
    .toString(true);

  return template(
    {
      cssPath,
      nonce: getNonce(),
      scriptPath,
    },
    htmlData
  );
};
