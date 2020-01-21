import { expect } from 'chai';
import { loadingView } from '../../../../templates/search';

suite('search - loadingView()', () => {
  test('Returns a string', () => {
    expect(loadingView()).to.be.a('string');
  });

  test('Renders a loader', () => {
    expect(loadingView()).contains('<div class="vsc-loader"></div>');
  });
});
