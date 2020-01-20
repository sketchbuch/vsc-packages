(function () {
  const vscode = acquireVsCodeApi();
  const searchField = document.getElementById('vsc-packages-search')

  if (searchField) {
    const onSearchKeyUp = (event) => {
      event.preventDefault()

      if (event.key === 'Enter') {
        vscode.postMessage({
          action: 'search',
          payload: event.target.value,
        });
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      searchField.addEventListener('keyup', onSearchKeyUp);

    });

    window.addEventListener('unload', () => {
      searchField.removeEventListener('keyup', onSearchKeyUp);
    });
  }
})();
