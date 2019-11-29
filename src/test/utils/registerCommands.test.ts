import * as vscode from 'vscode';
import * as sinon from 'sinon';
import registerCommands, { cmdDisplayPackage, cmdOpenNpm } from '../../utils/registerCommands';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../constants';

suite('utils: registerCommands()', () => {
  const packageName = 'test';

  suite('registerCommands()', () => {
    test('Registers the correct number of commands', () => {
      const stub = sinon.stub(vscode.commands, 'registerCommand');
      registerCommands();
      sinon.assert.callCount(stub, 2);
      stub.restore();
    });
  });

  suite('cmdDisplayPackage()', () => {
    test('Calls vscode.window.showInformationMessage()', () => {
      const spy = sinon.stub(vscode.window, 'showInformationMessage');
      cmdDisplayPackage(packageName);

      sinon.assert.callCount(spy, 1);
      spy.restore();
    });
  });

  suite('cmdOpenNpm()', () => {
    test('Calls vscode.commands.executeCommand()', () => {
      const spy = sinon.stub(vscode.commands, 'executeCommand');
      cmdOpenNpm(packageName);

      sinon.assert.callCount(spy, 1);
      sinon.assert.calledWith(spy, CMD_VSCODE_OPEN);
      spy.restore();
    });

    test('Calls vscode.Uri.parse()', () => {
      const spy = sinon.stub(vscode.Uri, 'parse');
      cmdOpenNpm(packageName);

      sinon.assert.callCount(spy, 1);
      sinon.assert.calledWith(spy, `${URL_NPM}${packageName}`);
      spy.restore();
    });
  });
});
