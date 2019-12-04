import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { mockCmds, mockContext } from '../mocks';
import { registerCommands } from '../../commands';

suite('registerCommands()', () => {
  test('Registers the correct number of commands', () => {
    const stub = sinon.stub(vscode.commands, 'registerCommand');
    registerCommands(mockCmds, mockContext);
    sinon.assert.callCount(stub, 1);
    stub.restore();
  });
});
