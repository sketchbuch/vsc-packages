import { NpmTags } from '../../../types';

const versionSnippet = (distTags: NpmTags | undefined): string => {
  if (distTags && distTags.latest) {
    return `<li class="data__version" title="Latest Version">v${distTags.latest}</li>`;
  }

  return '';
};

export default versionSnippet;
