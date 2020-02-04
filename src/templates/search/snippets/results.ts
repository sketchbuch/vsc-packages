import { NpmSearchResult, NpmSearchResults } from '../../../types';

export const results = (results: NpmSearchResults) => {
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
    </div>
  `;
};
