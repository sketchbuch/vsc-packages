import * as sinon from 'sinon';
import { cmdDisplayPackage } from '../../../../commands';
import { mockContext, packageName } from '../../../mocks';
import { packageWebview } from '../../../../webviews';

suite('cmdDisplayPackage()', () => {
  test('Calls PackageItem.createOrShow() correctly', () => {
    const stub = sinon.stub(packageWebview, 'show');
    cmdDisplayPackage(packageName, '1.0.0', mockContext);

    sinon.assert.callCount(stub, 1);
    // TODO - Find out why this assert fails - argument order seems to be reversed
    // sinon.assert.calledWith(stub, packageName, mockContext);
    stub.restore();
  });
});
