import { InlineListSnippet, isContributor, NpmContributors, NpmMaintainer } from '../../types';

export const mapNpmObjToInlineList = (
  maintainers: (NpmMaintainer | NpmContributors)[]
): InlineListSnippet[] => {
  return maintainers.map(
    (item: NpmMaintainer | NpmContributors): InlineListSnippet => {
      const newItem: InlineListSnippet = { label: item.name };

      if (isContributor(item) && item.url) {
        newItem.url = item.url;
      } else if (item.email) {
        newItem.email = item.email;
      }

      return newItem;
    }
  );
};
