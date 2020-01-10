import { NpmTags } from '../../../types';

const versionSnippet = (distTags: NpmTags | undefined): string => {
  if (distTags && distTags.latest) {
    return `<p class="version">v<strong>${distTags.latest}</strong></p>`;
  }

  return '';
};

export default versionSnippet;
