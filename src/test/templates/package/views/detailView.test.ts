import { expect } from 'chai';
import * as sinon from 'sinon';
import { detailView } from '../../../../templates/package';
import { mockNpmData, mockPackageData } from '../../../mocks';
import { Snippets } from '../../../../types';
import * as snippets from '../../../../templates/package/snippets';

const testSnippetCall = (methodName: Snippets): void => {
  test(`${methodName}() called once`, () => {
    const spy = sinon.spy(snippets, methodName);
    detailView(mockPackageData, 'readme', mockNpmData);
    sinon.assert.calledOnce(spy);

    if (methodName !== 'tabboxSnippet') {
      const dataPartName = methodName.replace('Snippet', '');
      const npmDataPart = spy.getCall(0).args[0];
      expect(npmDataPart).to.be.eql(mockNpmData[dataPartName]);
    }

    spy.restore();
  });
};

suite('detailView()', () => {
  test('Returns a string', () => {
    expect(detailView(mockPackageData, 'readme', mockNpmData)).to.be.a('string');
  });

  ([
    'authorSnippet',
    'bugsSnippet',
    'homepageSnippet',
    'licenseSnippet',
    'repositorySnippet',
    'tabboxSnippet',
  ] as Snippets[]).forEach((methodName: Snippets) => testSnippetCall(methodName));

  test('Renders a title', () => {
    const spy = sinon.spy(snippets, 'headlineSnippet');
    detailView(mockPackageData, 'readme', mockNpmData);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockPackageData, 'data');
    spy.restore();
  });

  test('Renders a description', () => {
    const result = detailView(mockPackageData, 'readme', mockNpmData);
    expect(result).contains(`<p class="data__description">${mockNpmData.description}</p>`);
  });
});
