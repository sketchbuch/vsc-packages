import { TableListSnippet } from '../../../types/package';
import { URL_NPM } from '../../../constants';

const tableListSnippet = (
  items: TableListSnippet[],
  packageName: string,
  title?: string
): string => {
  if (items.length > 0) {
    return `
      <section class="table-list">
        ${title ? `<h2 class="table-list__title">${title}</h2>` : ''}
        <div class="table-list__list">
          ${items
            .map((item: TableListSnippet): string => {
              return `
              <div class="table-list__item">
                <a class="table-list__item-element" href="${URL_NPM}${packageName}/v/${item.label}">
                  <span class="table-list__item-label">
                    ${item.label}
                  </span>
                  <span class="table-list__item-value">${item.value}</span>
                </a>
              </div>`;
            })
            .join('')}
        </div>
      </section>`;
  }

  return '';
};

export default tableListSnippet;
