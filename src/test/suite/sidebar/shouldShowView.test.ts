import { expect } from 'chai';
import { GetPackageJsonResult } from '../../../types';
import { shouldShowView } from '../../../sidebar';

suite('shouldShowView()', () => {
  const mockPakageJsonResult: GetPackageJsonResult = {
    error: null,
    data: {
      test: true,
      dependencies: {
        react: '1.0.1',
      },
      devDependencies: {
        'react-dom': '1.0.1',
      },
    },
  };

  test('Returns false if not in package.json', () => {
    expect(shouldShowView('peerDependencies', mockPakageJsonResult)).to.equal(false);
  });

  test('Returns true if in package.json', () => {
    expect(shouldShowView('dependencies', mockPakageJsonResult)).to.equal(true);
  });
});
