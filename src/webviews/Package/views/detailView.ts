import {
  authorSnippet,
  homepageSnippet,
  readmeSnippet,
  repositorySnippet
  } from '../snippets';
import { NpmPackageData } from '../../../types';

const detailView = (packageName: string, data: NpmPackageData) => {
  const { author, description, homepage, readme, repository } = data;

  return `
    <section class="data view">
      <header class="data__header view__header">
        <div class="view__header-content">
          <h1 class="data__name view__name">${packageName}</h1>
          <ul class="data__info">
            ${authorSnippet(author)}
            ${homepageSnippet(homepage)}
            ${repositorySnippet(repository)}
          </ul>
          <p class="data__description">${description}</p>
        </div>
      </header>
      <div class="view__content">
        <div class="view__content-box">
          ${readmeSnippet(readme)}
        </div>
      </div>
    </section>`;
};

export default detailView;
