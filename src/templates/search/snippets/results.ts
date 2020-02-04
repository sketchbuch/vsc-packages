import { EXT } from '../../../constants';
import { NpmSearchResult, NpmSearchResults } from '../../../types';

export const results = (results: NpmSearchResults, page: number) => {
  return `
    <div class="results">
      <ul class="results__list">
        ${results
          .map((record: NpmSearchResult) => {
            return `
              <li class="results__item">
                <p class="results__item-title">
                  <strong class="results__item-name">${record.name}</strong>
                  <span class="results__item-version">v${record.version}</span>
                </p>
                <p class="results__item-description">${record.description}</p>
              </li>
            `;
          })
          .join('')}
      </ul>
      <div class="results__more">
        <input id="${EXT}-search-more-page"  readonly type="hidden" value="${page}" />
        <a id="${EXT}-search-more-btn" class="results__more-btn monaco-button monaco-text-button setting-list-addButton">Load more...</a>
      </div>
    </div>
  `;
};
