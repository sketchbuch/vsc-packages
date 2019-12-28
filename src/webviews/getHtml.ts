import { GetHtml } from '../types';
import { getNonce, getResourceUri } from '../utils';
import { FS_FOLDER_CSS, FS_FOLDER_JS } from '../constants';

const getHtml = ({ extensionPath, getTemplate, packageName }: GetHtml): string => {
  const scriptPath = getResourceUri(extensionPath, FS_FOLDER_JS)
    .with({ scheme: 'vscode-resource' })
    .toString(true);
  const cssPath = getResourceUri(extensionPath, FS_FOLDER_CSS)
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
