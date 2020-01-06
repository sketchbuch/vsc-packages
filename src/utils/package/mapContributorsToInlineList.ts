import { NpmContributors, InlineListSnippet } from '../../types';

const mapContributorsToInlineList = (contributors: NpmContributors[]): InlineListSnippet[] => {
  return contributors.map(
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
};

export default mapContributorsToInlineList;
