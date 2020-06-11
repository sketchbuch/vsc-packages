import { expect } from 'chai';
import { bugsSnippet } from '../../../../../templates/package';
import { NpmBugs } from '../../../../../types';

suite('bugsSnippet()', () => {
  const mockBugs: NpmBugs = {
    url: 'https://github.com/sketchbuch/vsc-quokka-statusbar/issues',
  };

  test('Returns an empty string if bugs undefined', () => {
    const result = bugsSnippet(undefined);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if author !undefined', () => {
    const result = bugsSnippet(mockBugs);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });

  test('Contains the bug URL', () => {
    expect(bugsSnippet(mockBugs)).to.contain(mockBugs.url);
  });
});
