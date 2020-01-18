import { CmdCallbackData } from '../../../types';
import { headlineSnippet } from '../snippets';

export const errorView = (packageData: CmdCallbackData, error: Error) => {
  return `
    <section class="error view">
      <header class="error__header view__header">
        <div class="view__header-content">
        ${headlineSnippet(packageData, 'error')}
        </div>
      </header>
      <div class="view__content error__content">
        <h4 class="error__msg">An error occured</h4>
        <p class="error__msg-sub">${error.message}</p>
      </div>
    </section>`;
};
