const loadingView = (packageName: string) => {
  return `
    <section class="loading view">
      <header class="loading__header view__header">
        <div class="view__header-content">
          <h1 class="loading__name view__name">${packageName}</h1>
        </div>
      </header>
      <div class="view__content">
        <div class="view__content-box">
          <div class="loader">
            <div class="loader__spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
};

export default loadingView;
