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
                <div class="results__actions">
                  <span class="results__action-label">Install as:</span>
                  <span class="results__action" data-package="${record.name}" data-type="dependencies" tabindex="0">
                    Dependency
                  </span>
                  <span class="results__action" data-package="${record.name}" data-type="devDependencies" tabindex="0">
                    Dev Dependency
                  </span>
                  <span class="results__action" data-package="${record.name}" data-type="peerDependencies" tabindex="0">
                    Peer Dependency
                  </span>
                  <span class="results__action" data-package="${record.name}" data-type="optionalDependencies" tabindex="0">
                    Optional Dependency
                  </span>
                </div>
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
