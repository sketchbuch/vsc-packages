import * as sinon from 'sinon';
import { assert, expect } from 'chai';
import { extensionPath, mockPackageData, packageName } from '../../../mocks';
import { getHtml } from '../../../../templates/package';
import { GetHtml } from '../../../../types';
import * as utils from '../../../../utils';

suite('getHtml()', () => {
  const props: GetHtml = {
    getTemplate: args => '',
    extensionPath,
    htmlData: {
      activeTab: 'readme',
      packageData: mockPackageData,
      state: {
        data: undefined,
        error: undefined,
      },
    },
  };

  test('Returns a string', () => {
    expect(getHtml(props)).to.be.a('string');
  });

  test('Calls utils.getResourceUri() correctly', () => {
    const spy = sinon.spy(utils, 'getResourceUri');
    getHtml(props);
    sinon.assert.calledTwice(spy);
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
    expect(args.htmlData.packageData.packageName).to.be.eql(packageName);
    assert.isString(args.nonce);
    spy.restore();
  });
});