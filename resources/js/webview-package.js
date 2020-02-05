(function () {
  const vscode = acquireVsCodeApi();

  const setupTabs = () => {
    const allTabs = [];
    const selectedAttr = 'data-selected';
    const tabs = ['readme', 'versions', 'developers'];
    let selectedTab = null;

    tabs.forEach((tabId) => {
      const tab = document.getElementById(`tabbtn-${tabId}`);

      if (tab) {
        if (tab.dataset.selected) {
          selectedTab = tab;
        }
        allTabs.push(tab)

        tab.addEventListener('click', () => {
          if (!tab.dataset.selected) {
            if (selectedTab) {
              selectedTab.removeAttribute(selectedAttr);
            }

            tab.setAttribute(selectedAttr, true);
            selectedTab = tab
            vscode.postMessage({
              activeTab: tabId,
            });
            vscode.postMessage({
              action: 'display-package',
              payload: {
                activeTab: tabId,
              }
            });
          }
        });
      }
    })

    if (!selectedTab && allTabs.length > 0) {
      selectedTab = allTabs[0];
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
  });
})();
