import { t } from '../../../localisation';

export const homepageSnippet = (homepage: string | undefined): string => {
  if (homepage) {
    return `<li class="data__homepage"><a href="${homepage}">${t(
      'webViews.packages.detailView.home'
    )}</a></li>`;
  }

  return '';
};
