import { NpmPackageData, TabboxId, TabboxItems, CmdCallbackData } from '../../../types';
import {
  authorSnippet,
  bugsSnippet,
  columnsSnippet,
  contribSnippet,
  headlineSnippet,
  homepageSnippet,
  licenseSnippet,
  maintainerSnippet,
  readmeSnippet,
  repositorySnippet,
  tabboxSnippet,
  tagsSnippet,
  timeSnippet,
  versionSnippet,
} from '../snippets';

export const detailView = (
  packageData: CmdCallbackData,
  activeTab: TabboxId,
  data: NpmPackageData
) => {
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
          () => tagsSnippet(tags, packageData.packageName),
          () => timeSnippet(time, packageData.packageName)
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
          ${headlineSnippet(packageData, 'data')}
          <ul class="data__info">
            ${authorSnippet(author)}
            ${versionSnippet(tags)}
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
