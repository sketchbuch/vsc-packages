import { CmdCallbackData } from '../../../types';

export const headlineSnippet = (packageData: CmdCallbackData, classType: string): string => {
  const { packageName, packageVersion } = packageData;

  return `
    <h1 class="${classType}__name view__name">
      ${packageName} 
      ${packageVersion &&
        `<span class="${classType}__name--version view__name--version" title="Version listed in package.json">
          ${packageVersion}
        </span>`}
    </h1>
  `;
};
