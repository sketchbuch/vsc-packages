import { NpmMaintainer } from '../../../types';
import { inlineListSnippet } from '.';
import { mapNpmObjToInlineList } from '../../../utils';
import { t } from 'vscode-ext-localisation';

export const maintainerSnippet = (maintainers: NpmMaintainer[] | undefined): string => {
  if (maintainers && maintainers.length > 0) {
    const items = mapNpmObjToInlineList(maintainers);
    return inlineListSnippet(items, t('webViews.packages.detailView.maintainer'));
  }

  return '';
};
