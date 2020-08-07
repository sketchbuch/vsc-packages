import { expect } from 'chai';
/* import * as sinon from 'sinon';
import { mockMaintainers } from '../../../../mocks'; */
import * as snippets from '../../../../../templates/package/snippets';
//import * as utils from '../../../../../utils';

const maintainerSnippet = snippets.maintainerSnippet;

suite('maintainerSnippet()', () => {
  test('Returns an empty string if maintainers undfined or empty', () => {
    const result1 = maintainerSnippet(undefined);
    expect(result1).to.be.a('string');
    expect(result1).to.equal('');

    const result2 = maintainerSnippet([]);
    expect(result2).to.be.a('string');
    expect(result2).to.equal('');
  });

  // TODO - Fix spy import issue
  /*   test('Calls mapNpmObjToInlineList() correctly', () => {
    const spy = sinon.spy(utils, 'mapNpmObjToInlineList');
    maintainerSnippet(mockMaintainers);
    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, mockMaintainers);
    spy.restore();
  });

  test('Calls inlineListSnippet()', () => {
    const spy = sinon.spy(snippets, 'inlineListSnippet');
    maintainerSnippet(mockMaintainers);
    sinon.assert.callCount(spy, 1);
    spy.restore();
  }); */
});
