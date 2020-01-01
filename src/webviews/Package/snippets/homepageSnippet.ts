const homepageSnippet = (homepage: string | undefined): string => {
  if (homepage) {
    return `<li class="data__homepage"><a href="${homepage}">Homepage</a></li>`;
  }

  return '';
};

export default homepageSnippet;
