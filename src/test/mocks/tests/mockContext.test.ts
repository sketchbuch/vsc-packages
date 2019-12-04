import { expect } from 'chai';
import { extensionPath, mockContext } from '..';

suite('mockContext()', () => {
  test('Has correct shape', () => {
    const { asAbsolutePath, ...rest } = mockContext;

    expect(mockContext).to.be.an('object');
    expect(asAbsolutePath).to.be.an('function');
    expect(rest).to.have.eql({
      extensionPath,
      globalState: {},
      globalStoragePath: '',
      logPath: '',
      storagePath: '',
      subscriptions: [undefined],
      workspaceState: {},
    });
  });
});
