import * as sinon from 'sinon';
import * as vscode from 'vscode';
import mockCmds from '../mocks/mockCmds';
import { registerCommands } from '../../commands';

suite('commands: registerCommands()', () => {
  suite('registerCommands()', () => {
    test('Registers the correct number of commands', () => {
      const stub = sinon.stub(vscode.commands, 'registerCommand');
      registerCommands(mockCmds);
      sinon.assert.callCount(stub, 1);
      stub.restore();
    });
  });
});
