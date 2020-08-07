import { t } from 'vscode-ext-localisation';

const loadingIcon = (): string => {
  return `
    <span class="search-field__loader">
      <span class="search-field__spinner spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </span>`;
};

const clearButton = (name: string): string => {
  return `
    <a class="search-field__clearer" href="" id="${name}-clearer" title="${t(
    'webViews.search.searchField.clearBtn'
  )}"><span>+</span></a>`;
};

export const searchFieldSnippet = (term: string, loading: boolean, name: string): string => {
  return `
    <div class="search-field">
      <input
        ${loading &&
          'disabled="true" title="' +
            t('webViews.search.searchView.searchField.fieldTooltip') +
            '"'}
        autocapitalize="off"
        autocorrect="off"
        autofocus
        class="${
          loading ? 'search-field__input search-field__input--searching' : 'search-field__input'
        }"
        id="${name}"
        name="${name}"
        placeholder="${t('webViews.search.searchView.searchField.fieldPlaceholder')}"
        spellcheck="false"
        type="text"
        value="${term}"
      />
      ${clearButton(name)}
      ${loading === true ? `${loadingIcon()}` : ''}
    </div>
  `;
};
