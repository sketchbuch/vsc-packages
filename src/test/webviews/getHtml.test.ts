import * as path from 'path';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as utils from '../../utils';
import { assert, expect } from 'chai';
import { GetHtml } from '../../types';
import { extensionPath, mockPanel, packageName } from '../mocks';
import { getHtml } from '../../webviews';

suite('getHtml()', () => {
  const props: GetHtml = {
    getTemplate: args => '',
    extensionPath,
    packageName,
    webview: mockPanel.webview,
  };

  test('Returns a string', () => {
    expect(getHtml(props)).to.be.a('string');
  });

  test('Calls vscode.Uri.file() correctly', () => {
    const spy = sinon.spy(vscode.Uri, 'file');
    getHtml(props);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, path.join(extensionPath, 'media', 'main.js'));
    spy.restore();
  });

  test('Calls webview.asWebviewUri() correctly', () => {
    const spy = sinon.spy(mockPanel.webview, 'asWebviewUri');
    getHtml(props);
    sinon.assert.calledOnce(spy);
    assert.instanceOf(spy.getCall(0).args[0], vscode.Uri);
    spy.restore();
  });

  test('Calls webview.asWebviewUri() correctly', () => {
    const spy = sinon.spy(utils, 'getNonce');
    getHtml(props);
    sinon.assert.calledOnce(spy);
    spy.restore();
  });

  test('Calls getTemplate() correctly', () => {
    const spy = sinon.spy(props, 'getTemplate');
    getHtml(props);
    sinon.assert.calledOnce(spy);
    const args = spy.getCall(0).args[0];
    expect(args.packageName).to.be.eql(packageName);
    assert.isString(args.nonce);
    spy.restore();
  });
});
