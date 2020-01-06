import { expect } from 'chai';
import { homepageSnippet } from '../../../../webviews/Package/snippets';

suite('homepageSnippet()', () => {
  const homepage = 'http:www.reddwarf.co.uk/dave';

  test('Returns an empty string if homepage undefined or empty', () => {
    const result = homepageSnippet(undefined);
    expect(result).to.be.a('string');
    expect(result).to.equal('');

    const result2 = homepageSnippet('');
    expect(result2).to.be.a('string');
    expect(result2).to.equal('');
  });

  test('Contains a link with the correct URL', () => {
    expect(homepageSnippet(homepage)).to.contain(`<a href="${homepage}">`);
    expect(homepageSnippet(homepage)).to.contain('</a>');
  });
});
