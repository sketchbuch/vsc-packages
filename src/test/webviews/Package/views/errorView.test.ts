import { expect } from 'chai';
import { errorView } from '../../../../webviews/Package/views';
import { mockPackageData } from '../../../mocks';

suite('errorView()', () => {
  const mockError = new Error('An error occured!');

  test('Returns a string', () => {
    expect(errorView(mockPackageData, mockError)).to.be.a('string');
  });

  test('Renders a title', () => {
    expect(errorView(mockPackageData, mockError)).contains(
      `<h1 class="error__name view__name">${mockPackageData.packageName}</h1>`
    );
  });

  test('Renders the error message', () => {
    expect(errorView(mockPackageData, mockError)).contains(
      `<p class="error__msg-sub">${mockError.message}</p>`
    );
  });
});
