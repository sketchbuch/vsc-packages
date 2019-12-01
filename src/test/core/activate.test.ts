import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as sidebar from '../../sidebar';
import * as commands from '../../commands';
import mockCmds from '../mocks/mockCmds';
import { extViews } from '../../constants';
import { setupExt } from '../../core/activate';

suite('activate()', function() {
  test('setupExt() sets up extension correctly', function() {
    const stub: sinon.SinonSpy = sinon.stub(commands, 'registerCommands');
    const stub2: sinon.SinonSpy = sinon.stub(sidebar, 'setupSidebar');
    setupExt(mockCmds, extViews, {} as vscode.ExtensionContext);

    sinon.assert.calledOnce(stub);
    sinon.assert.calledOnce(stub2);
    sinon.assert.calledWith(stub2, extViews);
    stub.restore();
    stub2.restore();
  });
});
