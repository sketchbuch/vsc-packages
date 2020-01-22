import { EXT } from '../../../constants';

export const searchView = (term: string, loading: boolean) => {
  return `
    <section class="search view">
      <div class="search__content">
        <input
          ${loading && 'disabled="true"'}
          autocapitalize="off"
          autocorrect="off"
          autofocus
          class="search__input"
          id="${EXT}-search"
          name="${EXT}-search"
          placeholder="Search NPM for packages..."
          spellcheck="false"
          type="text"
          value="${term}"
        />
        ${loading === true && `<div class="vsc-loader"></div>`}
      </div>
    </section>`;
};
