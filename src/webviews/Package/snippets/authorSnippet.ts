import { NpmAuthor } from '../../../types';

const authorSnippet = (author: NpmAuthor | undefined): string => {
  if (author) {
    const { name, url } = author;

    if (url) {
      return `<li class="data__author"><a href="${url}">${name}</a></li>`;
    }

    return `<li class="data__author">${name}</li>`;
  }

  return '';
};

export default authorSnippet;
