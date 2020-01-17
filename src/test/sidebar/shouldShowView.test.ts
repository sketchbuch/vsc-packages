import { expect } from 'chai';
import { shouldShowView } from '../../sidebar';

suite('shouldShowView()', () => {
  const mockPakageJson = {
    test: true,
    dependencies: {
      react: '1.0.1',
    },
    devDependencies: {
      'react-dom': '1.0.1',
    },
  };

  test('Returns false if not in package.json', () => {
    expect(shouldShowView('peerDependencies', mockPakageJson)).to.equal(false);
  });

  test('Returns true if in package.json', () => {
    expect(shouldShowView('dependencies', mockPakageJson)).to.equal(true);
  });
});
