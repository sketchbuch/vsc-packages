import { CmdCallbackData } from '../../../types';
import { headlineSnippet } from '../snippets';

export const loadingView = (packageData: CmdCallbackData): string => {
  return `
    <section class="loading view">
      <header class="loading__header view__header">
        <div class="view__header-content">
        ${headlineSnippet(packageData, 'loading')}
        </div>
      </header>
      <div class="vsc-loader"></div>
    </section>`;
};
