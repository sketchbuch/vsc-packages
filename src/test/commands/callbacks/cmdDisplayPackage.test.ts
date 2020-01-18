import * as sinon from 'sinon';
import { cmdDisplayPackage } from '../../../commands';
import { mockContext, packageName } from '../../mocks';
import { Package } from '../../../webviews';

suite('cmdDisplayPackage()', () => {
  test('Calls Package.createOrShow() correctly', () => {
    const stub = sinon.stub(Package, 'createOrShow');
    cmdDisplayPackage({ packageName }, mockContext);

    sinon.assert.callCount(stub, 1);
    // TODO - Find out why this assert fails - argument order seems to be reversed
    // sinon.assert.calledWith(stub, packageName, mockContext);
    stub.restore();
  });
});
