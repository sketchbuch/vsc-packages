import { GetTemplate } from '../../types';
import { EXT } from '../../constants';

const getTemplate = ({ cssUri, packageName, nonce, scriptUri }: GetTemplate) => {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-${nonce}' vscode-resource://file*; style-src 'self' vscode-resource://file*;">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>${packageName}</title>

            <link href="${cssUri}" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1 id="${EXT}__name">${packageName}</h1>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
    </html>`;
};

export default getTemplate;

// <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
