import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockTags, packageName } from '../../../mocks';
import * as snippets from '../../../../webviews/Package/snippets';

const tagsSnippet = snippets.tagsSnippet;

suite('tagsSnippet()', () => {
  test('Returns an empty string if tags undefined', () => {
    const result = tagsSnippet(undefined, packageName);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if tags !undefined', () => {
    const result = tagsSnippet(mockTags, packageName);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });

  test('Calls tableListSnippet()', () => {
    const spy = sinon.spy(snippets, 'tableListSnippet');
    tagsSnippet(mockTags, packageName);
    sinon.assert.callCount(spy, 1);
    spy.restore();
  });
});
