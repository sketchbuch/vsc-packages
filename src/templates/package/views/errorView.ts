import { CmdCallbackData } from '../../../types';
import { headlineSnippet } from '../snippets';
import { t } from 'vscode-ext-localisation';

export const errorView = (packageData: CmdCallbackData, error: Error): string => {
  return `
    <section class="error view">
      <header class="error__header view__header">
        <div class="view__header-content">
        ${headlineSnippet(packageData, 'error')}
        </div>
      </header>
      <div class="view__content error__content">
        <h4 class="error__msg">${t('webViews.packages.errorView.headline')}</h4>
        <p class="error__msg-sub">${error.message}</p>
      </div>
    </section>`;
};
