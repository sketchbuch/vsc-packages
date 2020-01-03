(function () {
  const vscode = acquireVsCodeApi();

  const postTabChangeMesage = (tabId) => {
    vscode.postMessage({
      activeTab: tabId,
    });
  }

  const setupTabs = () => {
    const allTabs = [];
    const selectedAttr = 'data-selected';
    const tabs = ['readme', 'versions', 'dependents'];
    let selectedTab = null;

    tabs.forEach((tabId) => {
      const tab = document.getElementById(`tabbtn-${tabId}`);

      if (tab) {
        if (tab.dataset.selected) {
          selectedTab = tab;
        }
        allTabs.push(tab)

        tab.addEventListener('click', function (event) {
          if (!tab.dataset.selected) {
            if (selectedTab) {
              selectedTab.removeAttribute(selectedAttr);
            }

            tab.setAttribute(selectedAttr, true);
            selectedTab = tab
            postTabChangeMesage(tabId);
          }
        });
      }
    })

    if (!selectedTab && allTabs.length > 0) {
      selectedTab = allTabs[0];
    }
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    setupTabs();
  });
})();
