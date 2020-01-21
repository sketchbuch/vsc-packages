import { expect } from 'chai';
import { searchView } from '../../../../templates/search';

suite('search - searchView()', () => {
  test('Returns a string', () => {
    expect(searchView('')).to.be.a('string');
  });

  test('Renders an input', () => {
    expect(searchView('')).contains(`<input`);
  });

  test('Sets value correctly', () => {
    expect(searchView('vscode')).contains(`value="vscode"`);
  });
});
