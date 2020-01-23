import { detailView, errorView, loadingView } from '..';
import { FS_WEBVIEW_PACKAGE_CSS, FS_WEBVIEW_PACKAGE_JS } from '../../../constants';
import { GetTemplate, PackageHtmlData } from '../../../types';
import { metaTagsSnippet } from '../../shared';

export const defaultTemplate = (
  { cssPath, nonce, scriptPath }: GetTemplate,
  htmlData: PackageHtmlData
): string => {
  const { packageData, state } = htmlData;
  let content: string;

  if (state.error) {
    content = errorView(packageData, state.error);
  } else if (state.data) {
    content = detailView(packageData, state.activeTab, state.data);
  } else {
    content = loadingView(packageData);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTagsSnippet(nonce)}
        <title>${packageData.packageName}</title>
        <link href="${cssPath}/${FS_WEBVIEW_PACKAGE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptPath}/${FS_WEBVIEW_PACKAGE_JS}"></script>
      </body>
    </html>`;
};
