import { expect } from 'chai';
import { loadingView } from '../../../../webviews/Package/views';
import { packageName } from '../../../mocks';

suite('loadingView()', () => {
  test('Returns a string', () => {
    expect(loadingView(packageName)).to.be.a('string');
  });

  test('Renders a title', () => {
    expect(loadingView(packageName)).contains(
      `<h1 class="loading__name view__name">${packageName}</h1>`
    );
  });

  test('Renders a loader', () => {
    expect(loadingView(packageName)).contains('<div class="vsc-loader"></div>');
  });
});
