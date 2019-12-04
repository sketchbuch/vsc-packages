import { expect } from 'chai';
import { CMD_VSCODE_OPEN_WV } from '../../../constants';
import { Package } from '../../../webviews';
import { mockContext, mockPanel, packageName } from '../../mocks';

suite('Package()', () => {
  test('Creating an instance is successful', () => {
    mockContext; //?
    new Package(packageName, mockPanel, mockContext);
    expect(Package.currentPanel).to.equal(mockPanel);
    expect(Package.currentPackage).to.equal(packageName);
    expect(Package.viewType).to.equal(CMD_VSCODE_OPEN_WV);
  });
});
