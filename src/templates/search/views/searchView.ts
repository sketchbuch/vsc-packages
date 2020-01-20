import { EXT } from '../../../constants';
import { SearchData } from '../../../types';

export const searchView = (data: SearchData) => {
  return `
    <section class="search view">
      <form class="search__content">
        <h1 class="search__headline">Search</h1>
        <input id="${EXT}-search" name="${EXT}-search" placeholder="Search NPM for packages..." type="text" />
        <button type="submit">Search</button>
      </form>
    </section>`;
};
