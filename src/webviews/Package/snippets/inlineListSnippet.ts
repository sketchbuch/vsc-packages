import { InlineListSnippet } from '../../../types/package';

const inlineListSnippet = (items: InlineListSnippet[], title?: string): string => {
  if (items.length > 0) {
    const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

    return `
      <section class="inline-list">
        ${title ? `<h2 class="inline-list__title">${title}</h2>` : ''}
        <div class="inline-list__list">
          ${sortedItems
            .map((item: InlineListSnippet): string => {
              if (item.url) {
                return `
                  <div class="inline-list__item">
                    <a class="inline-list__element" href="${item.url}">${item.label}</a>
                  </div>`;
              } else if (item.email) {
                return `
                  <div class="inline-list__item">
                    <a class="inline-list__element" href="mailto:${item.email}">@ ${item.label}</a>
                  </div>`;
              }

              return `<div class="inline-list__item"><span class="inline-list__element">${item.label}</span></div>`;
            })
            .join('')}
          </div>
      </section>`;
  }

  return '';
};

export default inlineListSnippet;
