import { GetHtml } from '../types';
import { getNonce, getResourceUri } from '../utils';
import { FS_FOLDER_CSS, FS_FOLDER_JS } from '../constants';

const getHtml = ({ extensionPath, getTemplate, packageName, state }: GetHtml): string => {
  const scriptPath = getResourceUri(extensionPath, FS_FOLDER_JS)
    .with({ scheme: 'vscode-resource' })
    .toString(true);
  const cssPath = getResourceUri(extensionPath, FS_FOLDER_CSS)
    .with({ scheme: 'vscode-resource' })
    .toString(true);

  return getTemplate({
    cssPath,
    nonce: getNonce(),
    packageName,
    scriptPath,
    state,
  });
};

export default getHtml;
