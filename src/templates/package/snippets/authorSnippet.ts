import { NpmAuthor } from '../../../types';
import { t } from '../../../localisation';

export const authorSnippet = (author: NpmAuthor | undefined): string => {
  if (author) {
    const { name, url } = author;

    if (url) {
      return `<li class="data__author"><a href="${url}" title="${t(
        'webViews.packages.detailView.authorTooltip'
      )}">${name}</a></li>`;
    }

    return `<li class="data__author" title="${t(
      'webViews.packages.detailView.authorTooltip'
    )}">${name}</li>`;
  }

  return '';
};
