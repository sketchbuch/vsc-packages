import { EXT } from '../../../constants';
import { infoMessageSnippet, results } from '../snippets';
import { searchFieldSnippet, searchSortSnippet } from '../../shared';
import { SearchState } from '../../../types';
import { t } from 'vscode-ext-localisation';

export const searchView = (state: SearchState) => {
  const { data, loading, page, sort, term } = state;
  let content: string = '';

  if (loading) {
    content = '<div class="vsc-loader"></div>';
  } else if (data) {
    if (data.length > 0) {
      content = results(data, page);
    } else {
      content = infoMessageSnippet(
        t('webViews.search.searchView.noResults.headline'),
        t('webViews.search.searchView.noResults.description')
      );
    }
  } else {
    content = infoMessageSnippet(
      t('webViews.search.searchView.search.headline'),
      t('webViews.search.searchView.search.description')
    );
  }

  return `
    <section class="search view">
      <div class="search-bar">
        ${searchFieldSnippet(term, loading, `${EXT}-search`)}
        ${searchSortSnippet(`${EXT}-search-sort`, sort)}
      </div>
      <div class="search__content">
        ${content}
      </div>
    </section>`;
};
