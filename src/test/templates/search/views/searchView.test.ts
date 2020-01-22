import { expect } from 'chai';
import { searchView } from '../../../../templates/search';

suite('search - searchView()', () => {
  test('Returns a string', () => {
    expect(searchView('', false)).to.be.a('string');
  });

  test('Renders an input', () => {
    expect(searchView('', false)).contains(`<input`);
  });

  test('Sets value correctly', () => {
    expect(searchView('vscode', true)).contains(`value="vscode"`);
  });
});
