const loadingView = (packageName: string) => {
  return `
    <section class="loading view">
      <header class="loading__header view__header">
        <div class="view__header-content">
          <h1 class="loading__name view__name">${packageName}</h1>
        </div>
      </header>
      <div class="vsc-loader"></div>
    </section>`;
};

export default loadingView;
