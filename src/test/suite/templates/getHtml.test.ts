import * as sinon from 'sinon';
import { assert, expect } from 'chai';
import { extensionPath, mockPackageData } from '../../mocks';
import { getHtml } from '../../../templates';
import { GetHtml, PackageHtmlData } from '../../../types';
// import * as utils from '../../../utils';

suite('getHtml()', () => {
  const props: GetHtml<PackageHtmlData> = {
    template: () => '',
    extensionPath,
    htmlData: {
      packageData: mockPackageData,
      state: {
        activeTab: 'readme',
        data: undefined,
        error: undefined,
      },
    },
  };

  test('Returns a string', () => {
    expect(getHtml(props)).to.be.a('string');
  });

  // TODO - Fix spy import issue
  /*   test('Calls utils.getResourceUri() correctly', () => {
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
  }); */

  test('Calls template() correctly', () => {
    const spy = sinon.spy(props, 'template');
    getHtml(props);
    sinon.assert.calledOnce(spy);
    const args = spy.getCall(0).args;
    assert.isDefined(args[0].cssPath);
    assert.isString(args[0].cssPath);
    assert.isDefined(args[0].nonce);
    assert.isString(args[0].nonce);
    assert.isDefined(args[0].scriptPath);
    assert.isString(args[0].scriptPath);
    expect(args[1].packageData.packageName).to.be.eql(mockPackageData.packageName);
    expect(args[1].packageData.packageVersion).to.be.eql(mockPackageData.packageVersion);
    expect(args[1].state.activeTab).to.be.eql(props.htmlData.state.activeTab);
    spy.restore();
  });
});
