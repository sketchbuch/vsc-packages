import { EXT, FS_WEBVIEW_PACKAGE_CSS } from '../../../constants';
import { GetTemplate } from '../../../types';

const getTemplate = ({ cssPath, packageName, nonce, scriptPath }: GetTemplate) => {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" 
              content="default-src 'self' vscode-resource: 'nonce-${nonce}';
              img-src 'self' vscode-resource: 'nonce-${nonce}';"
              script-src 'self' vscode-resource: 'nonce-${nonce}';
              style-src 'self' vscode-resource: 'nonce-${nonce}';
            >
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${packageName}</title>
            <link href="${cssPath}/${FS_WEBVIEW_PACKAGE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
        </head>
        <body>
            <h1 class="${EXT}__name">${packageName}</h1>
            <div class="${EXT}__loader">
              <div class="${EXT}__loader-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
        </body>
    </html>`;
};

export default getTemplate;
