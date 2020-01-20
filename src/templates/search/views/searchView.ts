import { EXT } from '../../../constants';
import { SearchData } from '../../../types';

export const searchView = (data: SearchData) => {
  return `
    <section class="search view">
      <div class="search__content">
        <input
          autocapitalize="off"
          autocorrect="off"
          autofocus
          class="search__input"
          id="${EXT}-search"
          name="${EXT}-search"
          placeholder="Search NPM for packages..."
          spellcheck="false"
          type="text"
        />
      </div>
    </section>`;
};
