import { expect } from 'chai';
/* import * as sinon from 'sinon';
import * as renderMarkdown from 'marked'; */
import { readmeSnippet } from '../../../../webviews/Package/snippets';

suite('readmeSnippet()', () => {
  const README = 'Some long explanation';

  test('Returns an empty string if readme empty', () => {
    const result = readmeSnippet('');

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if readme not empty', () => {
    const result = readmeSnippet(README);

    expect(result).to.be.a('string');
    expect(result).to.contain(README);
  });

  /*   test('Calls mapContributorsToInlineList() correctly', () => {
    const spy = sinon.spy(renderMarkdown);
    readmeSnippet(README);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, README);
    spy.restore();
  }); */
});
