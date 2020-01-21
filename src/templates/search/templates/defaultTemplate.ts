import { FS_WEBVIEW_SEARCH_CSS, FS_WEBVIEW_SEARCH_JS } from '../../../constants';
import { GetTemplate, SearchHtmlData } from '../../../types';
import { searchView, loadingView } from '..';

export const defaultTemplate = (
  { cssPath, nonce, scriptPath }: GetTemplate,
  htmlData: SearchHtmlData
): string => {
  const { state } = htmlData;
  let content: string = '';

  if (state.error) {
    // content = errorView(packageData, state.error);
  } else if (state.data) {
    content = searchView(state.term);
  } else {
    content = loadingView();
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
        <title>Packages: Search</title>
        <link href="${cssPath}/${FS_WEBVIEW_SEARCH_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptPath}/${FS_WEBVIEW_SEARCH_JS}"></script>
      </body>
    </html>`;
};
