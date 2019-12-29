import * as path from 'path';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { assert, expect } from 'chai';
import * as utils from '../../../../utils';
import { FS_FOLDER_JS, FS_FOLDER_RESOURCES, FS_FOLDER_CSS } from '../../../../constants';
import { GetHtml } from '../../../../types';
import { extensionPath, packageName } from '../../../mocks';
import { getHtml } from '../../../../webviews';

suite('getHtml()', () => {
  const props: GetHtml = {
    getTemplate: args => '',
    extensionPath,
    htmlData: {
      packageName,
      state: {
        data: undefined,
        error: undefined,
      },
    },
  };

  test('Returns a string', () => {
    expect(getHtml(props)).to.be.a('string');
  });

  test('Calls vscode.Uri.file() correctly', () => {
    const spy = sinon.spy(vscode.Uri, 'file');
    getHtml(props);
    sinon.assert.calledTwice(spy);
    expect(
      spy.getCall(0).calledWithExactly(path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS))
    );
    expect(
      spy.getCall(1).calledWithExactly(path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS))
    );
    spy.restore();
  });

  test('Calls utils.getNonce() correctly', () => {
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
    expect(args.htmlData.packageName).to.be.eql(packageName);
    assert.isString(args.nonce);
    spy.restore();
  });
});
