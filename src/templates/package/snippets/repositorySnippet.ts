import { NpmRepository } from '../../../types';
import { t } from '../../../localisation';

export const repositorySnippet = (repository: NpmRepository | undefined): string => {
  if (repository) {
    const { url } = repository;
    return `<li class="data__repository"><a href="${url}">${t(
      'webViews.packages.detailView.repository'
    )}</a></li>`;
  }

  return '';
};
