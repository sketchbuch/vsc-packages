import { NpmPackageData } from '../../../types';
import {
  authorSnippet,
  bugsSnippet,
  columnsSnippet,
  // contribSnippet,
  homepageSnippet,
  licenceSnippet,
  // maintainerSnippet,
  // readmeSnippet,
  repositorySnippet,
  tagsSnippet,
  timeSnippet,
} from '../snippets';

/*
${readmeSnippet(readme)}
${maintainerSnippet(maintainers)}
${contribSnippet(contributors)}
*/

const detailView = (packageName: string, data: NpmPackageData) => {
  const {
    'dist-tags': tags,
    author,
    bugs,
    // contributors,
    description,
    homepage,
    license,
    // maintainers,
    // readme,
    repository,
    time,
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
            ${licenceSnippet(license)}
          </ul>
          <p class="data__description">${description}</p>
        </div>
      </header>
      <div class="data__content view__content">
        <div class="tabbox">
          <ul class="tabbox__buttons">
            <li class="tabbox__button"><a id="tabbtn-readme" data-selected="true" href="#">Readme</a></li>
            <li class="tabbox__button"><a id="tabbtn-versions" href="#">Versions</a></li>
            <li class="tabbox__button"><a id="tabbtn-dependents" href="#">Dependents</a></li>
          </ul>
          <div class="tabbox__content">
            <div class="tabbox__content-box">
              ${columnsSnippet(
                () => tagsSnippet(tags, packageName),
                () => timeSnippet(time, packageName)
              )}
              </div>
          </div>
        </div>
      </div>
    </section>`;
};

export default detailView;
