import { NpmTags } from '../../../types';
import { t } from 'vscode-ext-localisation';

export const versionSnippet = (distTags: NpmTags | undefined): string => {
  if (distTags && distTags.latest) {
    return `<li class="data__version" title="${t(
      'webViews.packages.detailView.versionTooltip'
    )}">v${distTags.latest}</li>`;
  }

  return '';
};
