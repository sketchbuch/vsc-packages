import { expect } from 'chai';
//import * as sinon from 'sinon';
import { NpmTime } from '../../../../../types';
import { packageName } from '../../../../mocks';
import * as snippets from '../../../../../templates/package/snippets';

suite('timeSnippet()', () => {
  const timeSnippet = snippets.timeSnippet;
  const mockTime: NpmTime = {
    '16.10.2': '2019-10-03T21:10:56.351Z',
    '16.11.0': '2019-10-22T21:22:52.188Z',
    '16.12.0': '2019-11-14T23:57:29.304Z',
    created: '2011-10-26T17:46:21.942Z',
    modified: '2020-01-07T13:06:57.879Z',
  };

  test('Returns an empty string if time undefined', () => {
    const result = timeSnippet(undefined, packageName);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if time !undefined', () => {
    const result = timeSnippet(mockTime, packageName);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });

  // TODO - Fix spy import issue
/*   test('Calls tableListSnippet()', () => {
    const spy = sinon.spy(snippets, 'tableListSnippet');
    timeSnippet(mockTime, packageName);
    sinon.assert.callCount(spy, 1);
    spy.restore();
  }); */
});
