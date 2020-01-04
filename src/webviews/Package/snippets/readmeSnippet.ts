import * as renderMarkdown from 'marked';

const readmeSnippet = (readme: string): string => {
  if (readme) {
    return `<div class="data__readme">${renderMarkdown(readme)}</div>`;
  }

  return '';
};

export default readmeSnippet;
