import { NpmTags } from '../../../types';

const versionSnippet = (distTags: NpmTags): string => {
  if (distTags && distTags.latest) {
    return `<p class="version">v<strong>${distTags.latest}</strong></p>`;
  }

  return '';
};

export default versionSnippet;
