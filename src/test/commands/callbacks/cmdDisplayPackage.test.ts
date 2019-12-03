import * as sinon from 'sinon';
import mockContext from '../../mocks/mockContext';
import { Package } from '../../../webviews';
import { cmdDisplayPackage } from '../../../commands';

suite('cmdDisplayPackage()', () => {
  const packageName = 'test';

  test('Calls Package.createOrShow() correctly', () => {
    const stub = sinon.stub(Package, 'createOrShow');
    cmdDisplayPackage(packageName, mockContext);

    sinon.assert.callCount(stub, 1);
    sinon.assert.calledWith(stub, mockContext, packageName);
    stub.restore();
  });
});
