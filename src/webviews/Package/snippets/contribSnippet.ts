import { inlineListSnippet } from './';
import { NpmContributors } from '../../../types';
import { mapContributorsToInlineList } from '../../../utils';

const contribSnippet = (contributors: NpmContributors[] | undefined): string => {
  if (contributors && contributors.length > 0) {
    const items = mapContributorsToInlineList(contributors);
    return inlineListSnippet(items, 'Contributors');
  }

  return '';
};

export default contribSnippet;
