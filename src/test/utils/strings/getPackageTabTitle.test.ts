import { expect } from 'chai';
import { getPackageTabTitle } from '../../../utils/strings/getPackageTabTitle';

suite('getPackageTabTitle()', () => {
  test('Returns a string containing the title', () => {
    expect(getPackageTabTitle('webViews.packages.tabTitle')).to.contain(
      'webViews.packages.tabTitle'
    );
  });
});
