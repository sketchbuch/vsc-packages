import { expect } from 'chai';
import { searchView } from '../../../../../templates/search';
import { SearchState } from '../../../../../types';

suite('search - searchView()', () => {
  const state: SearchState = {
    data: undefined,
    error: undefined,
    loading: false,
    page: 1,
    sort: 'optimal',
    term: '',
  };

  test('Returns a string', () => {
    expect(searchView(state)).to.be.a('string');
  });

  test('Renders an input', () => {
    expect(searchView(state)).contains(`<input`);
  });
});
