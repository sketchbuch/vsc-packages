import { NpmPackageData } from '../../../types';
import {
  authorSnippet,
  homepageSnippet,
  readmeSnippet,
  repositorySnippet,
  versionSnippet,
} from '../snippets';

const detailView = (data: NpmPackageData) => {
  const { author, description, 'dist-tags': distTags, homepage, readme, repository } = data;

  return `
    <div class="data">
      ${versionSnippet(distTags)}
      <ul class="data-info">
        ${authorSnippet(author)}
        ${homepageSnippet(homepage)}
        ${repositorySnippet(repository)}
      </ul>
      <hr />
      <p class="description">${description}</p>
      ${readmeSnippet(readme)}
    </div>`;
};

export default detailView;
