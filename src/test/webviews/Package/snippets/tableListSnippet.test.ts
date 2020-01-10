import { expect } from 'chai';
import { mockTableListItems, packageName } from '../../../mocks';
import { tableListSnippet } from '../../../../webviews/Package/snippets';

suite('tableListSnippet()', () => {
  test('Returns an empty string if no items', () => {
    const result = tableListSnippet([], packageName);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if there are items', () => {
    const result = tableListSnippet(mockTableListItems, packageName);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });

  test('Returns the title if provided', () => {
    expect(tableListSnippet(mockTableListItems, packageName, 'A Title')).to.contain(
      'table-list__title'
    );
  });

  test('Renders correct number of items', () => {
    const items = tableListSnippet(mockTableListItems, packageName, 'A Title').match(
      /table-list__item"/g
    );
    expect(items?.length).to.equal(mockTableListItems.length);
  });
});
