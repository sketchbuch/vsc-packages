import { expect } from 'chai';
import { messageSnippet } from '../../../../webviews/Package/snippets';

suite('messageSnippet()', () => {
  test('Returns a string containing the message', () => {
    const result = messageSnippet('A message');

    expect(result).to.be.a('string');
    expect(result).to.contain('A message');
  });
});
