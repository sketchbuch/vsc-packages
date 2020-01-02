const errorView = (packageName: string, error: Error) => {
  return `
    <section class="error view">
      <header class="error__header view__header">
        <div class="view__header-content">
          <h1 class="error__name view__name">${packageName}</h1>
        </div>
      </header>
      <p class="error__msg">An error occured</p>
      <p class="error__msg-sub">${error.message}</p>
    </section>`;
};

export default errorView;
