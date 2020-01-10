import { expect } from 'chai';
import { repositorySnippet } from '../../../../webviews/Package/snippets';
import { NpmRepository } from '../../../../types';

suite('repositorySnippet()', () => {
  const mockRepository: NpmRepository = {
    type: 'git',
    url: 'http://git.reddwarf.co.uk/repo',
  };

  test('Returns an empty string if repository undefined', () => {
    const result = repositorySnippet(undefined);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Returns a string containing the repo url', () => {
    const result = repositorySnippet(mockRepository);

    expect(result).to.be.a('string');
    expect(result).to.contain(mockRepository.url);
  });
});
