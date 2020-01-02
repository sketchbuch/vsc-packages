import { InlineListSnippet, NpmMaintainer } from '../../../types';
import { inlineListSnippet } from '.';

const maintainerSnippet = (maintainers: NpmMaintainer[]): string => {
  if (maintainers && maintainers.length > 0) {
    const items = maintainers.map(
      (maintainer: NpmMaintainer): InlineListSnippet => {
        const newContributor: InlineListSnippet = { label: maintainer.name };

        if (maintainer.email) {
          newContributor.email = maintainer.email;
        }

        return newContributor;
      }
    );

    return inlineListSnippet(items, 'Maintainers');
  }

  return '';
};

export default maintainerSnippet;
