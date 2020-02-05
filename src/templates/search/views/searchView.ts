import { EXT } from '../../../constants';
import { searchFieldSnippet, searchSortSnippet } from '../../shared';
import { SearchState } from '../../../types';
import { infoMessageSnippet, results } from '../snippets';

export const searchView = (state: SearchState) => {
  const { data, loading, page, sort, term } = state;
  let content: string = '';

  if (loading) {
    content = '<div class="vsc-loader"></div>';
  } else if (data) {
    if (data.length > 0) {
      content = results(data, page);
    } else {
      content = infoMessageSnippet('No packages found', 'Please try modifying your search term');
    }
  } else {
    content = infoMessageSnippet(
      'Enter a search term to begin',
      'Matching packages will be listed here for you to install'
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
