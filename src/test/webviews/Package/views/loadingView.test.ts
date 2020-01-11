import { expect } from 'chai';
import { loadingView } from '../../../../webviews/Package/views';
import { mockPackageData } from '../../../mocks';

suite('loadingView()', () => {
  test('Returns a string', () => {
    expect(loadingView(mockPackageData)).to.be.a('string');
  });

  test('Renders a title', () => {
    expect(loadingView(mockPackageData)).contains(
      `<h1 class="loading__name view__name">${mockPackageData.packageName}</h1>`
    );
  });

  test('Renders a loader', () => {
    expect(loadingView(mockPackageData)).contains('<div class="vsc-loader"></div>');
  });
});
