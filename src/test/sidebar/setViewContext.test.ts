import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as sidebar from '../../sidebar';
import { EXT } from '../../constants';

suite('setViewContext()', () => {
  const setViewContext = sidebar.setViewContext;
  const mockPakageJson = {
    test: true,
    dependencies: {
      react: '1.0.1',
    },
    devDependencies: {
      'react-dom': '1.0.1',
    },
  };

  test('Calls executeCommand() correctly', () => {
    const spy = sinon.spy(vscode.commands, 'executeCommand');
    setViewContext('dependencies', mockPakageJson);

    sinon.assert.callCount(spy, 1);
    const callArgs = spy.getCall(0).args;
    expect(callArgs[0]).to.equal('setContext');
    expect(callArgs[1]).to.equal(`${EXT}-dependencies`);
    spy.restore();
  });

  test('Calls shouldShowView() correctly', () => {
    const spy = sinon.spy(sidebar, 'shouldShowView');
    setViewContext('dependencies', mockPakageJson);

    sinon.assert.callCount(spy, 1);
    const callArgs = spy.getCall(0).args;
    expect(callArgs[0]).to.equal('dependencies');
    expect(callArgs[1]).to.equal(mockPakageJson);
    spy.restore();
  });
});
