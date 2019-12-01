import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { cmdDisplayPackage } from '../../../commands';

suite('cmdDisplayPackage()', () => {
  const packageName = 'test';

  test('Calls vscode.window.showInformationMessage()', () => {
    const spy = sinon.stub(vscode.window, 'createWebviewPanel');
    cmdDisplayPackage(packageName);

    sinon.assert.callCount(spy, 1);
    spy.restore();
  });
});
