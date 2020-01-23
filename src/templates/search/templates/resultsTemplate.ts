import { FS_WEBVIEW_SEARCH_JS, FS_WEBVIEW_SEARCH_RESULTS_CSS } from '../../../constants';
import { GetTemplate, SearchHtmlData } from '../../../types';
import { metaTagsSnippet } from '../../shared';
import { resultsView } from '../views';

export const resultsTemplate = (
  { cssPath, nonce, scriptPath }: GetTemplate,
  htmlData: SearchHtmlData
): string => {
  const { state } = htmlData;
  const content: string = resultsView(state.term, state.loading);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTagsSnippet(nonce)}
        <title>Packages: Search Result</title>
        <link href="${cssPath}/${FS_WEBVIEW_SEARCH_RESULTS_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptPath}/${FS_WEBVIEW_SEARCH_JS}"></script>
      </body>
    </html>`;
};
