import { NpmBugs } from '../../../types';

const bugsSnippet = (bugs: NpmBugs | undefined): string => {
  if (bugs) {
    return `<li class="data__bugs"><a href="${bugs.url}">Issues</a></li>`;
  }

  return '';
};

export default bugsSnippet;
