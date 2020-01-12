import { expect } from 'chai';
import { headlineSnippet } from '../../../../webviews/Package/snippets';
import { mockPackageData, packageName } from '../../../mocks';

suite('headlineSnippet()', () => {
  test('Returns a string', () => {
    const result = headlineSnippet(mockPackageData, 'data');
    expect(result).to.be.a('string');
  });

  test('Headline contains packageVersion and packageName', () => {
    const result = headlineSnippet(mockPackageData, 'data');
    expect(result).to.contain(mockPackageData.packageName);
    expect(result).to.contain(mockPackageData.packageVersion);
  });

  test('Headline does not contain packageVersion if undefined', () => {
    const result = headlineSnippet(
      {
        packageName,
      },
      'data'
    );
    expect(result).to.contain(mockPackageData.packageName);
    expect(result).not.to.contain(mockPackageData.packageVersion);
  });
});
