import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { mockContext } from '../mocks';
import { registerCommands } from '../../commands';

suite('registerCommands()', () => {
  test('Registers the correct number of commands', () => {
    const stub = sinon.stub(vscode.commands, 'registerCommand');
    registerCommands(mockContext);
    sinon.assert.callCount(stub, 5);
    stub.restore();
  });
});
