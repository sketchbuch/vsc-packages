import { errorView, searchView } from '..';
import { FS_WEBVIEW_SEARCH_CSS, FS_WEBVIEW_SEARCH_JS } from '../../../constants';
import { GetTemplate, SearchHtmlData } from '../../../types';
import { metaTagsSnippet } from '../../shared';
import { t } from 'vscode-ext-localisation';

export const defaultTemplate = (
  { cssPath, nonce, scriptPath }: GetTemplate,
  htmlData: SearchHtmlData
): string => {
  const { state } = htmlData;

  let content: string;

  if (state.error) {
    content = errorView(state.error);
  } else {
    content = searchView(state);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTagsSnippet(nonce)}
        <title>${t('webViews.search.tabTitle')}</title>
        <link href="${cssPath}/${FS_WEBVIEW_SEARCH_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptPath}/${FS_WEBVIEW_SEARCH_JS}"></script>
      </body>
    </html>`;
};
