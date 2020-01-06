import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockContributors } from '../../../mocks';
import * as snippets from '../../../../webviews/Package/snippets';
import * as utils from '../../../../utils';

const contribSnippet = snippets.contribSnippet;

suite('contribSnippet()', () => {
  test('Returns an empty string if no contributors', () => {
    const result = contribSnippet(undefined);
    expect(result).to.equal('');

    const result2 = contribSnippet([]);
    expect(result2).to.equal('');
  });

  test('Calls mapContributorsToInlineList() correctly', () => {
    const spy = sinon.spy(utils, 'mapContributorsToInlineList');
    contribSnippet(mockContributors);
    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockContributors);
    spy.restore();
  });

  test('Calls inlineListSnippet()', () => {
    const spy = sinon.spy(snippets, 'inlineListSnippet');
    contribSnippet(mockContributors);
    sinon.assert.callCount(spy, 1);
    spy.restore();
  });
});
