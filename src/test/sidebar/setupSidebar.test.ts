import * as sinon from 'sinon';
import * as vscode from 'vscode';
import mockContext from '../mocks/mockContext';
import setupSidebar from '../../sidebar/setupSidebar';
import { extViews } from '../../constants';

suite('setupSidebar()', () => {
  test('Calls fs.accessSync() the correct number of times', () => {
    const spy = sinon.spy(vscode.window, 'registerTreeDataProvider');
    setupSidebar(extViews, mockContext);

    sinon.assert.callCount(spy, 2);
    spy.restore();
  });
});
