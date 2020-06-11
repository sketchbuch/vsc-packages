import { t } from '../../../localisation';

export const licenseSnippet = (license: string): string => {
  if (license) {
    return `<li class="data__licence" title="${t(
      'webViews.packages.detailView.inlineList.licenceTooltip'
    )}">${license}</li>`;
  }

  return '';
};
