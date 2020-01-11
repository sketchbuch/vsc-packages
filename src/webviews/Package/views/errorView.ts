import { CmdCallbackData } from '../../../types';
import { headlineSnippet } from '../snippets';

const errorView = (packageData: CmdCallbackData, error: Error) => {
  return `
    <section class="error view">
      <header class="error__header view__header">
        <div class="view__header-content">
        ${headlineSnippet(packageData, 'error')}
        </div>
      </header>
      <p class="error__msg">An error occured</p>
      <p class="error__msg-sub">${error.message}</p>
    </section>`;
};

export default errorView;
