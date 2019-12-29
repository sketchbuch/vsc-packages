import { EXT } from '../../../constants';
import { NpmPackageData, NpmAuthor, NpmTags, NpmRepository } from '../../../types';

const getAuthor = (author: NpmAuthor | undefined): string => {
  if (author) {
    const { name, url } = author;

    if (url) {
      return `<p class="${EXT}__data-author">Author: <a href="${url}">${name}</a></p>`;
    }

    return `<p class="${EXT}__data-author">Author: ${name}</p>`;
  }

  return '';
};

const getHomepage = (homepage: string | undefined): string => {
  if (homepage) {
    return `<p class="${EXT}__data-homepage">Homepage: <a href="${homepage}">${homepage}</a></p>`;
  }

  return '';
};

const getRepository = (repository: NpmRepository): string => {
  if (repository) {
    const { type, url } = repository;

    if (url) {
      if (type) {
        return `<p class="${EXT}__data-repository">Repository (${type}): <a href="${url}">${url}</a></p>`;
      }
      return `<p class="${EXT}__data-repository">Repository: <a href="${url}">${url}</a></p>`;
    }
  }

  return '';
};

const getVersion = (distTags: NpmTags): string => {
  if (distTags && distTags.latest) {
    return `<p class="${EXT}__data-version">v<strong>${distTags.latest}</strong></p>`;
  }

  return '';
};

const getDetail = (data: NpmPackageData) => {
  const { author, description, 'dist-tags': distTags, homepage, repository } = data;

  return `
    <div class="${EXT}__data">
      ${getVersion(distTags)}
      ${getAuthor(author)}
      ${getHomepage(homepage)}
      ${getRepository(repository)}
      <hr />
      <p class="${EXT}__data-description">${description}</p>
    </div>`;
};

export default getDetail;
