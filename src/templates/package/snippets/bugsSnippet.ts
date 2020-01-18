import { NpmBugs } from '../../../types';

export const bugsSnippet = (bugs: NpmBugs | undefined): string => {
  if (bugs) {
    return `<li class="data__bugs"><a href="${bugs.url}">Issues</a></li>`;
  }

  return '';
};
