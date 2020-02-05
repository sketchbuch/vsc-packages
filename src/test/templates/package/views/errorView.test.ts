import { expect } from 'chai';
import * as sinon from 'sinon';
import { errorView } from '../../../../templates/package';
import { mockPackageData } from '../../../mocks';
import * as snippets from '../../../../templates/package/snippets';

suite('package - errorView()', () => {
  const mockError = new Error('An error occured!');

  test('Returns a string', () => {
    expect(errorView(mockPackageData, mockError)).to.be.a('string');
  });

  test('Renders a title', () => {
    const spy = sinon.spy(snippets, 'headlineSnippet');
    errorView(mockPackageData, mockError);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockPackageData, 'error');
    spy.restore();
  });

  test('Renders the error message', () => {
    expect(errorView(mockPackageData, mockError)).contains(
      `<p class="error__msg-sub">${mockError.message}</p>`
    );
  });
});
