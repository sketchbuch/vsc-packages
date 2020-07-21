import { NpmTime, TableListSnippet } from '../../../types';
import { t } from 'vscode-ext-localisation';
import { tableListSnippet } from '.';
import * as timeago from 'timeago.js';

export const timeSnippet = (time: NpmTime | undefined, packageName: string): string => {
  if (time) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return tableListSnippet(
      items,
      packageName,
      t('webViews.packages.detailView.time', { count: items.length.toString() })
    );
  }

  return '';
};
