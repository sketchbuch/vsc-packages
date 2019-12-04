import { expect } from 'chai';
import { extensionPath, mockContext } from '..';

suite('mockContext()', () => {
  test('Has correct shape', () => {
    const { asAbsolutePath, globalState, ...rest } = mockContext;

    expect(mockContext).to.be.an('object');
    expect(asAbsolutePath).to.be.an('function');
    expect(globalState).to.be.an('object');
    expect(globalState.get).to.be.an('function');
    expect(globalState.update).to.be.an('function');
    expect(rest).to.have.eql({
      extensionPath,
      globalStoragePath: '',
      logPath: '',
      storagePath: '',
      subscriptions: [undefined],
      workspaceState: {},
    });
  });
});
