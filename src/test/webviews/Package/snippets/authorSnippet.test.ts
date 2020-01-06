import { expect } from 'chai';
import { authorSnippet } from '../../../../webviews/Package/snippets';
import { NpmAuthor } from '../../../../types';

suite('authorSnippet()', () => {
  const mockAuthor: NpmAuthor = {
    name: 'Dave Lister',
    url: 'http:www.reddwarf.co.uk/dave',
  };

  test('Returns an empty string if author undefined', () => {
    const result = authorSnippet(undefined);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if author !undefined', () => {
    const result = authorSnippet(mockAuthor);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });

  test('Contains the authors name', () => {
    expect(authorSnippet(mockAuthor)).to.contain(mockAuthor.name);
  });

  test('<a> tag rendered if there is a URL', () => {
    const result = authorSnippet(mockAuthor);

    expect(result).to.contain(`<a href="${mockAuthor.url}" `);
    expect(result).to.contain('</a>');
  });

  test('<a> tag not rendered if there is no URL', () => {
    const result = authorSnippet({ name: 'Dave Lister' });

    expect(result).not.to.contain(`<a href="${mockAuthor.url}" `);
    expect(result).not.to.contain('</a>');
  });
});
