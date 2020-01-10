import { NpmRepository } from '../../../types';

const repositorySnippet = (repository: NpmRepository | undefined): string => {
  if (repository) {
    const { url } = repository;
    return `<li class="data__repository"><a href="${url}">Repository</a></li>`;
  }

  return '';
};

export default repositorySnippet;
