import { SearchSort } from '../../../types';

export const searchSortSnippet = (name: string, selected: SearchSort): string => {
  return `
    <div class="search-sort">
      <label class="search-sort__label" for="${name}">Sort by: </label>
      <select
        class="search-sort__select"
        id="${name}"
        name="${name}"
      >
        <option ${
          selected === 'maintenance' ? 'selected ' : ''
        }value="maintenance">Last Update</option>
        <option ${selected === 'quality' ? 'selected ' : ''}value="quality">Quality</option>
        <option ${
          selected === 'popularity' ? 'selected ' : ''
        }value="popularity">Popularity</option>
        <option ${selected === 'optimal' ? 'selected ' : ''}value="optimal">Relevance</option>
      </select>
    </div>
  `;
};
