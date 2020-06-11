import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockContext } from '../../../mocks';
import { cmdSearchNpm } from '../../../../commands';
import { searchWebview } from '../../../../webviews';

suite('cmdSearchNpm()', () => {
  test('Calls searchWebview.show() correctly', () => {
    const spy = sinon.spy(searchWebview, 'show');
    cmdSearchNpm(mockContext);

    sinon.assert.callCount(spy, 1);
    const spyArgs = spy.getCall(0).args;
    expect(spyArgs[0]).to.equal(mockContext);
    spy.restore();
  });
});
