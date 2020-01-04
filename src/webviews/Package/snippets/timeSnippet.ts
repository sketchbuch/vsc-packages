import * as timeago from 'timeago.js';
import { NpmTime, TableListSnippet } from '../../../types';
import { tableListSnippet } from '.';

const timeSnippet = (time: NpmTime | undefined, packageName: string): string => {
  if (time) {
    const { created, modified, ...versionTags } = time;
    const items = Object.keys(versionTags)
      .map(
        (tag: string): TableListSnippet => {
          return {
            label: tag,
            value: timeago.format(Date.parse(time[tag])),
          };
        }
      )
      .reverse();

    return tableListSnippet(items, packageName, `Version History (${items.length})`);
  }

  return '';
};

export default timeSnippet;
