import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../../constants';
import { cmdOpenNpm } from '../../../commands';
import { mockContext, packageName } from '../../mocks';

suite('cmdOpenNpm()', () => {
  test('Calls vscode.commands.executeCommand()', () => {
    const spy = sinon.stub(vscode.commands, 'executeCommand');
    cmdOpenNpm({ packageName }, mockContext);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, CMD_VSCODE_OPEN);
    spy.restore();
  });

  test('Calls vscode.Uri.parse()', () => {
    const spy = sinon.stub(vscode.Uri, 'parse');
    cmdOpenNpm({ packageName }, mockContext);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, `${URL_NPM}${packageName}`);
    spy.restore();
  });
});
