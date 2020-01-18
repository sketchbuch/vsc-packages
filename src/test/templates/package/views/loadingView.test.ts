import { expect } from 'chai';
import * as sinon from 'sinon';
import { loadingView } from '../../../../templates/package';
import { mockPackageData } from '../../../mocks';
import * as snippets from '../../../../templates/package/snippets';

suite('loadingView()', () => {
  test('Returns a string', () => {
    expect(loadingView(mockPackageData)).to.be.a('string');
  });

  test('Renders a title', () => {
    const spy = sinon.spy(snippets, 'headlineSnippet');
    loadingView(mockPackageData);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockPackageData, 'loading');
    spy.restore();
  });

  test('Renders a loader', () => {
    expect(loadingView(mockPackageData)).contains('<div class="vsc-loader"></div>');
  });
});
