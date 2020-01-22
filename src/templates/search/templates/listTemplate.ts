import { FS_WEBVIEW_SEARCH_CSS, FS_WEBVIEW_SEARCH_JS } from '../../../constants';
import { GetTemplate } from '../../../types';
// import { searchView } from '..';

export const listTemplate = ({ cssPath, nonce, scriptPath }: GetTemplate): string => {
  const content: string = '<p>List</p>';

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
        <title>Packages: Search Result</title>
        <link href="${cssPath}/${FS_WEBVIEW_SEARCH_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptPath}/${FS_WEBVIEW_SEARCH_JS}"></script>
      </body>
    </html>`;
};
