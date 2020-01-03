import getDetail from '../views/detailView';
import getError from '../views/errorView';
import getLoading from '../views/loadingView';
import { FS_WEBVIEW_PACKAGE_CSS, FS_WEBVIEW_PACKAGE_JS } from '../../../constants';
import { GetTemplate } from '../../../types';

const getTemplate = ({ cssPath, htmlData, nonce, scriptPath }: GetTemplate) => {
  const { activeTab, packageName, state } = htmlData;
  let content: string;

  if (state.error) {
    content = getError(packageName, state.error);
  } else if (state.data) {
    content = getDetail(packageName, activeTab, state.data);
  } else {
    content = getLoading(packageName);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self' vscode-resource: 'nonce-${nonce}';
          img-src 'self' vscode-resource: data: 'nonce-${nonce}';
          script-src 'self' vscode-resource: 'nonce-${nonce}';
          style-src 'self' vscode-resource: 'nonce-${nonce}'";
        >
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${packageName}</title>
        <link href="${cssPath}/${FS_WEBVIEW_PACKAGE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptPath}/${FS_WEBVIEW_PACKAGE_JS}"></script>
      </body>
    </html>`;
};

export default getTemplate;
