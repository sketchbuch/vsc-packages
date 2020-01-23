import { EXT } from '../../../constants';
import { searchFieldSnippet } from '../../shared';

export const resultsView = (term: string, loading: boolean) => {
  return `
    <section class="search-results">
      <div class="search-results__bar">
        ${searchFieldSnippet(term, loading, `${EXT}-search`)}
      </div>
      <div class="search-results__content">
        sdcsddscdsc
      </div>
    </section>`;
};
