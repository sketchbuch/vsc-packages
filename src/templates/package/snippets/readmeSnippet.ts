import * as renderMarkdown from 'marked';

export const readmeSnippet = (readme: string): string => {
  if (readme) {
    return `<div class="data__readme">${renderMarkdown(readme)}</div>`;
  }

  return '';
};
