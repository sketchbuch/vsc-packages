import * as MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

const readmeSnippet = (readme: string): string => {
  if (readme) {
    return `<div class="data__readme">${md.render(readme)}</div>`;
  }

  return '';
};

export default readmeSnippet;
