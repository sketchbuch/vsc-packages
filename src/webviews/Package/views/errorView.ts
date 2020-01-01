const errorView = (packageName: string, error: Error) => {
  return `
    <section class="error view">
      <header class="error__header view__header">
        <div class="view__header-content">
          <h1 class="error__name view__name">${packageName}</h1>
        </div>
      </header>
      <div class="error__content view__content">
        <div class="view__content-box">
          <p class="error__msg">An error occured</p>
          <p class="error__msg-sub">${error.message}</p>
        </div>
      </div>
    </section>`;
};

export default errorView;
