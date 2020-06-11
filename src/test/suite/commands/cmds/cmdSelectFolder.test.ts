import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { cmdSelectFolder } from '../../../../commands';
import { EXT, EXT_WSSTATE_SELFOLDER } from '../../../../constants';
import { mockContext, mockWorkspaceFolder } from '../../../mocks';
import { PackageList } from '../../../../treeviews';

suite('cmdSelectFolder()', () => {
  test('Calls searchWebview.show() correctly', () => {
    const spy = sinon.spy(mockContext.workspaceState, 'update');
    const spy2 = sinon.stub(vscode.commands, 'executeCommand');
    const spy3 = sinon.stub(mockContext.workspaceState, 'get');

    const folder = mockWorkspaceFolder();
    cmdSelectFolder(folder, mockContext, new PackageList(mockContext));

    sinon.assert.callCount(spy, 1);
    const spyArgs = spy.getCall(0).args;
    expect(spyArgs[0]).to.equal(EXT_WSSTATE_SELFOLDER);
    expect(spyArgs[1]).to.equal(folder);

    sinon.assert.callCount(spy2, 1);
    const spy2Args = spy2.getCall(0).args;
    expect(spy2Args[0]).to.equal('setContext');
    expect(spy2Args[1]).to.equal(`${EXT}-folder`);
    expect(spy2Args[2]).to.equal(folder);

    sinon.assert.callCount(spy3, 1);
    expect(spy3.getCall(0).args[0]).to.equal(EXT_WSSTATE_SELFOLDER);
    spy.restore();
    spy2.restore();
    spy3.restore();
  });
});
