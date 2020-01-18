import { expect } from 'chai';
import { licenseSnippet } from '../../../../templates/package';

suite('licenseSnippet()', () => {
  test('Returns an empty string if licence empty', () => {
    const result = licenseSnippet('');

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a non-empty string if author !undefined', () => {
    const result = licenseSnippet('MIT');

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
    expect(result).to.contain('MIT');
  });
});
