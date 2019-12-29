const errorView = (error: Error) => {
  return `
    <div class="error">
      <p class="error__msg">An error occured</p>
      <p class="error__msg-sub">${error.message}</p>
    </div>`;
};

export default errorView;
