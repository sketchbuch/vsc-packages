const readmeSnippet = (readme: string): string => {
  if (readme) {
    return `<div class="readme"><pre>${readme}</pre></div>`;
  }

  return '';
};

export default readmeSnippet;
