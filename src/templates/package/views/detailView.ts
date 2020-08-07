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
import { t } from 'vscode-ext-localisation';

export const detailView = (
  packageData: CmdCallbackData,
  activeTab: TabboxId,
  data: NpmPackageData
): string => {
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
        label: t('webViews.packages.detailView.tabs.readme.tabLabel'),
        selected: activeTab === 'readme',
      },
      content: (): string => readmeSnippet(readme),
      emptyMessage: t('webViews.packages.detailView.tabs.readme.empty'),
      id: 'readme',
    },
    {
      button: {
        label: t('webViews.packages.detailView.tabs.versions.tabLabel'),
        selected: activeTab === 'versions',
      },
      content: (): string =>
        columnsSnippet(
          () => tagsSnippet(tags, packageData.packageName),
          () => timeSnippet(time, packageData.packageName)
        ),
      emptyMessage: t('webViews.packages.detailView.tabs.versions.empty'),
      id: 'versions',
    },
    {
      button: {
        label: t('webViews.packages.detailView.tabs.dev.tabLabel'),
        selected: activeTab === 'developers',
      },
      content: (): string => maintainerSnippet(maintainers) + contribSnippet(contributors),
      emptyMessage: t('webViews.packages.detailView.tabs.dev.empty'),
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
