import * as sinon from 'sinon';
import mockContext from '../../mocks/mockContext';
import { Package } from '../../../webviews';
import { cmdDisplayPackage } from '../../../commands';

suite('cmdDisplayPackage()', () => {
  const packageName = 'test';

  test('Calls vscode.window.showInformationMessage()', () => {
    const stub = sinon.stub(Package, 'createOrShow');
    cmdDisplayPackage(packageName, mockContext);

    sinon.assert.callCount(stub, 1);
    sinon.assert.calledWith(stub, mockContext.extensionPath, packageName);
    stub.restore();
  });
});
