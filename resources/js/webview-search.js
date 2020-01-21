(function () {
  const vscode = acquireVsCodeApi();
  const searchField = document.getElementById('vsc-packages-search')

  if (searchField) {
    const onSearchKeyUp = (event) => {
      event.preventDefault()

      if (event.key === 'Enter') {
        const {value} = event.target

        if (value !== '') {
          vscode.postMessage({
            action: 'search',
            payload: {
              term: value,
            }
          });
        }
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
