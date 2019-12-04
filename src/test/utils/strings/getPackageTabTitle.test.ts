import { expect } from 'chai';
import getPackageTabTitle from '../../../utils/strings/getPackageTabTitle';

suite('getPackageTabTitle()', () => {
  test('Returns a string containing the title', () => {
    expect(getPackageTabTitle('test-title')).to.contain('test-title');
  });
});
