import { EXT } from '../../../constants';
import { searchFieldSnippet } from '../../shared';

export const searchView = (term: string, loading: boolean) => {
  return `
    <section class="search view">
      <div class="search__content">
        ${searchFieldSnippet(term, loading, `${EXT}-search`)}
      </div>
    </section>`;
};
