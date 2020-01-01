import getPackageTabTitle from '../../../utils/strings/getPackageTabTitle';
import { expect } from 'chai';

suite('getPackageTabTitle()', () => {
  test('Returns a string containing the title', () => {
    expect(getPackageTabTitle('test-title')).to.contain('test-title');
  });
});
