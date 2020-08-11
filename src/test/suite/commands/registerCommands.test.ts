import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { FolderList, PackageList } from '../../../treeviews';
import { mockContext } from '../../mocks';
import { registerCommands } from '../../../commands';

suite('registerCommands()', () => {
  test('Registers the correct number of commands', () => {
    const stub = sinon.stub(vscode.commands, 'registerCommand');
    registerCommands(
      mockContext,
      new FolderList(vscode.workspace.workspaceFolders, mockContext),
      new PackageList(mockContext)
    );
    sinon.assert.callCount(stub, 6);
    stub.restore();
  });
});
