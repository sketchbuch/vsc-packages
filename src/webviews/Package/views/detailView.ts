import { NpmPackageData, TabboxId, TabboxItems } from '../../../types';
import {
  contribSnippet,
  maintainerSnippet,
  readmeSnippet,
  authorSnippet,
  bugsSnippet,
  columnsSnippet,
  homepageSnippet,
  licenseSnippet,
  repositorySnippet,
  tabboxSnippet,
  tagsSnippet,
  timeSnippet,
} from '../snippets';

const detailView = (packageName: string, activeTab: TabboxId, data: NpmPackageData) => {
  const {
    'dist-tags': tags,
    author,
    bugs,
    contributors,
    description,
    homepage,
    license,
    maintainers,
    readme,
    repository,
    time,
  } = data;

  const tabboxItems: TabboxItems = [
    {
      button: {
        label: 'Readme',
        selected: activeTab === 'readme',
      },
      content: () => readmeSnippet(readme),
      emptyMessage: 'No readme available',
      id: 'readme',
    },
    {
      button: {
        label: 'Versions',
        selected: activeTab === 'versions',
      },
      content: () =>
        columnsSnippet(
          () => tagsSnippet(tags, packageName),
          () => timeSnippet(time, packageName)
        ),
      emptyMessage: 'No version information available',
      id: 'versions',
    },
    {
      button: {
        label: 'Developers',
        selected: activeTab === 'developers',
      },
      content: () => maintainerSnippet(maintainers) + contribSnippet(contributors),
      emptyMessage: 'No maintainer/contributor infromation available',
      id: 'developers',
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
            ${licenseSnippet(license)}
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
