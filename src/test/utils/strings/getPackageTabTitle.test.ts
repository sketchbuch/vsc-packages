import { expect } from 'chai';
import getPackageTabTitle from '../../../utils/strings/getPackageTabTitle';

suite('getPackageTabTitle()', () => {
  test('Returns nonce', () => {
    expect(getPackageTabTitle('test-title')).to.contain('test-title');
  });
});
