export const errorView = (error: Error) => {
  return `
    <section class="error view">
      <div class="view__content error__content">
        <h4 class="error__msg">Error searching the NPM registry</h4>
        <p class="error__msg-sub">${error.message}</p>
      </div>
    </section>`;
};
