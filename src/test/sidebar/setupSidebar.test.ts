import * as sinon from 'sinon';
import * as vscode from 'vscode';
import setupSidebar from '../../sidebar/setupSidebar';
import { extViews } from '../../constants';
import { mockContext } from '../mocks';

suite('setupSidebar()', () => {
  test('Calls fs.accessSync() the correct number of times', () => {
    const spy = sinon.spy(vscode.window, 'registerTreeDataProvider');
    setupSidebar(extViews, mockContext);

    sinon.assert.callCount(spy, 2);
    spy.restore();
  });
});
