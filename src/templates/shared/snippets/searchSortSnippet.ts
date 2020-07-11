import { SearchSort } from '../../../types';
import { t } from 'vscode-ext-localisation';

export const searchSortSnippet = (name: string, selected: SearchSort): string => {
  return `
    <div class="search-sort">
      <label class="search-sort__label" for="${name}">${t(
    'webViews.search.searchView.searchSort.label'
  )}</label>
      <select
        class="search-sort__select"
        id="${name}"
        name="${name}"
      >
        <option ${selected === 'maintenance' ? 'selected ' : ''}value="maintenance">${t(
    'webViews.search.searchView.searchSort.sortUpdated'
  )}</option>
        <option ${selected === 'quality' ? 'selected ' : ''}value="quality">${t(
    'webViews.search.searchView.searchSort.sortQuality'
  )}</option>
        <option ${selected === 'popularity' ? 'selected ' : ''}value="popularity">${t(
    'webViews.search.searchView.searchSort.sortPopularity'
  )}</option>
        <option ${selected === 'optimal' ? 'selected ' : ''}value="optimal">${t(
    'webViews.search.searchView.searchSort.sortRelevance'
  )}</option>
      </select>
    </div>
  `;
};
