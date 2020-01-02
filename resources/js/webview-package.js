(function () {
  const vscode = acquireVsCodeApi();
  function testAlert() {
    vscode.postMessage({
      command: 'alert',
      text: '🐛  on line ',
    });
  }

  document.addEventListener("DOMContentLoaded", function (event) {
    const element = document.getElementById('tabbtn-versions');

    element.addEventListener('click', function (event) {
      testAlert();
    });
  });
})();
