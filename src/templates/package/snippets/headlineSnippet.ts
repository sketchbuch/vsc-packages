import { CmdCallbackData } from '../../../types';
import { t } from '../../../localisation';

export const headlineSnippet = (packageData: CmdCallbackData, classType: string): string => {
  const { packageName, packageVersion } = packageData;

  return `
    <h1 class="${classType}__name view__name">
      ${packageName} 
      ${packageVersion &&
        `<span class="${classType}__name--version view__name--version" title="${t(
          'webViews.packages.detailView.headlineTooltip'
        )}">
          ${packageVersion}
        </span>`}
    </h1>
  `;
};
