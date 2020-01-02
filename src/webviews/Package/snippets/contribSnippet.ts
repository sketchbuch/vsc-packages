import { inlineListSnippet } from './';
import { InlineListSnippet, NpmContributors } from '../../../types';

const contribSnippet = (contributors: NpmContributors[]): string => {
  if (contributors && contributors.length > 0) {
    const items = contributors.map(
      (contributor: NpmContributors): InlineListSnippet => {
        const newContributor: InlineListSnippet = { label: contributor.name };

        if (contributor.url) {
          newContributor.url = contributor.url;
        } else if (contributor.email) {
          newContributor.email = contributor.email;
        }

        return newContributor;
      }
    );

    return inlineListSnippet(items, 'Contributors');
  }

  return '';
};

export default contribSnippet;
