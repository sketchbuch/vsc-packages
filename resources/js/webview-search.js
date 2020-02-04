(function () {
  const vscode = acquireVsCodeApi();
  const searchField = document.getElementById('vsc-packages-search');
  const sortField = document.getElementById('vsc-packages-search-sort');
  const moreBtn = document.getElementById('vsc-packages-search-more-btn');
  const morePage = document.getElementById('vsc-packages-search-more-page');

  if (searchField) {
    const searchClearer = document.getElementById('vsc-packages-search-clearer');

    const onSearchClearerClick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const newEvent = new Event('keyup');
      newEvent.key = 'Escape';
      searchField.dispatchEvent(newEvent);
    }

    const onSearchKeyUp = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const {value} = event.target;

      if (value) {
        if (event.key === 'Escape') {
          vscode.postMessage({
            action: 'clear',
            payload: {
              term: '',
            },
          });
        } else if (event.key === 'Enter') {
          const {value} = event.target;

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
      searchClearer.addEventListener('click', onSearchClearerClick);
      searchField.addEventListener('keyup', onSearchKeyUp);

    });

    window.addEventListener('unload', () => {
      searchField.removeEventListener('click', onSearchClearerClick);
      searchField.removeEventListener('keyup', onSearchKeyUp);
    });
  }

  if (sortField) {
    const onSortChange = (event) => {
      const {value} = event.target;

      vscode.postMessage({
        action: 'sort',
        payload: {
          sort: value,
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      sortField.addEventListener('change', onSortChange);

    });

    window.addEventListener('unload', () => {
      sortField.removeEventListener('change', onSortChange);
    });
  }

  if (moreBtn && morePage) {
    const onMoreClick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      vscode.postMessage({
        action: 'more',
        payload: {
          page: parseInt(morePage.value, 10)
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      moreBtn.addEventListener('click', onMoreClick);

    });

    window.addEventListener('unload', () => {
      moreBtn.removeEventListener('click', onMoreClick);
    });
  }
})();
