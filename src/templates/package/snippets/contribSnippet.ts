import { inlineListSnippet } from './';
import { mapNpmObjToInlineList } from '../../../utils';
import { NpmContributors } from '../../../types';
import { t } from '../../../localisation';

export const contribSnippet = (contributors: NpmContributors[] | undefined): string => {
  if (contributors && contributors.length > 0) {
    const items = mapNpmObjToInlineList(contributors);
    return inlineListSnippet(items, t('webViews.packages.detailView.contrib'));
  }

  return '';
};
