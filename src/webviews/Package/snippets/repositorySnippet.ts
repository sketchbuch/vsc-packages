import { NpmRepository } from '../../../types';

const repositorySnippet = (repository: NpmRepository): string => {
  if (repository) {
    const { type, url } = repository;

    if (url) {
      if (type) {
        return `<li class="repository"><a href="${url}">Repository</a></li>`;
      }
      return `<li class="repository"><a href="${url}">Repository</a></li>`;
    }
  }

  return '';
};

export default repositorySnippet;
