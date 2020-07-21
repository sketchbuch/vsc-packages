import { expect } from 'chai';
import { NpmTags } from '../../../../../types';
import { versionSnippet } from '../../../../../templates/package';

suite('versionSnippet()', () => {
  const mockDistTags: NpmTags = {
    experimental: '0.0.0-experimental-f42431abe',
    latest: '16.12.0',
    next: '0.0.0-b53ea6ca0',
  };

  test('Returns an empty string if dist-tags undefined or there is no latest', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { latest, ...mockDistTags2 } = mockDistTags;

    const result1 = versionSnippet(undefined);

    expect(result1).to.be.a('string');
    expect(result1).to.equal('');

    const result2 = versionSnippet(mockDistTags2);

    expect(result2).to.be.a('string');
    expect(result2).to.equal('');
  });

  test('Returns a non-empty string if dist-tags !undefined and contain latest', () => {
    const result = versionSnippet(mockDistTags);

    expect(result).to.be.a('string');
    expect(result).not.to.equal('');
  });

  test('Return value contains the latest', () => {
    expect(versionSnippet(mockDistTags)).to.contain(mockDistTags.latest);
  });
});
