import { NpmPackageData, TabboxItems } from '../../../types';
import {
  // contribSnippet,
  // maintainerSnippet,
  readmeSnippet,
  authorSnippet,
  bugsSnippet,
  // columnsSnippet,
  homepageSnippet,
  licenceSnippet,
  repositorySnippet,
  tabboxSnippet,
  // tagsSnippet,
  // timeSnippet,
} from '../snippets';

/*
${readmeSnippet(readme)}
${maintainerSnippet(maintainers)}
${contribSnippet(contributors)}
*/

const detailView = (packageName: string, data: NpmPackageData) => {
  const {
    // 'dist-tags': tags,
    author,
    bugs,
    // contributors,
    description,
    homepage,
    license,
    // maintainers,
    readme,
    repository,
    // time,
  } = data;

  const tabboxItems: TabboxItems = [
    {
      button: {
        label: 'Readme',
        selected: true,
      },
      content: () => readmeSnippet(readme),
      id: 'readme',
    },
    {
      button: {
        label: 'Versions',
        selected: false,
      },
      content: () => '<p>Versions</p>',
      id: 'versions',
    },
    {
      button: {
        label: 'Dependents',
        selected: false,
      },
      content: () => '<p>Dependents</p>',
      id: 'dependents',
    },
  ];

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
            ${licenceSnippet(license)}
          </ul>
          <p class="data__description">${description}</p>
        </div>
      </header>
      <div class="data__content view__content">
        ${tabboxSnippet(tabboxItems)}
      </div>
    </section>`;
};

export default detailView;
