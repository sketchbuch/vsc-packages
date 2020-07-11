import { NpmBugs } from '../../../types';
import { t } from 'vscode-ext-localisation';

export const bugsSnippet = (bugs: NpmBugs | undefined): string => {
  if (bugs) {
    return `<li class="data__bugs"><a href="${bugs.url}">${t(
      'webViews.packages.detailView.bugs'
    )}</a></li>`;
  }

  return '';
};
