import * as vscode from 'vscode';
import * as sinon from 'sinon';
import setupSidebar from '../../utils/setupSidebar';
import { extViews } from '../../constants';

suite('utils: setupSidebar()', () => {
  test('Calls fs.accessSync() the correct number of times', () => {
    const spy = sinon.spy(vscode.window, 'registerTreeDataProvider');
    setupSidebar(extViews);

    sinon.assert.callCount(spy, 2);
    spy.restore();
  });
});
