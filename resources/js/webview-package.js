
// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  console.log('### webview-package.js');
  alert('### webview-package.js');
}());