import { NpmPackageData } from '../../../types';
import {
  authorSnippet,
  bugsSnippet,
  contribSnippet,
  homepageSnippet,
  maintainerSnippet,
  readmeSnippet,
  repositorySnippet,
} from '../snippets';

// ${readmeSnippet(readme)}

const detailView = (packageName: string, data: NpmPackageData) => {
  const {
    author,
    bugs,
    contributors,
    description,
    homepage,
    readme,
    maintainers,
    repository,
  } = data;

  return `
    <section class="data view">
      <header class="data__header view__header">
        <div class="view__header-content">
          <h1 class="data__name view__name">${packageName}</h1>
          <ul class="data__info">
            ${authorSnippet(author)}
            ${homepageSnippet(homepage)}
            ${repositorySnippet(repository)}
            ${bugsSnippet(bugs)}
          </ul>
          <p class="data__description">${description}</p>
        </div>
      </header>
      <div class="data__content view__content">
        <div class="tabbox">
          <ul class="tabbox__buttons">
            <li class="tabbox__button"><a data-selected="true" href="#">Readme</a></li>
            <li class="tabbox__button"><a href="#">Contributors</a></li>
          </ul>
          <div class="tabbox__content">
            <div class="tabbox__content-box">
              ${maintainerSnippet(maintainers)}
              ${contribSnippet(contributors)}
            </div>
          </div>
        </div>
      </div>
    </section>`;
};

export default detailView;
