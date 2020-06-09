import * as commands from '../../commands';
import * as sidebar from '../../sidebar';
import * as sinon from 'sinon';
import * as webviews from '../../webviews';
import { mockContext } from '../mocks';
import { setupExt } from '../../core';

suite('activate()', function() {
  test('setupExt() sets up extension correctly', function() {
    const stubRc = sinon.stub(commands, 'registerCommands');
    const stubWv = sinon.stub(webviews, 'registerWebviews');
    const stubSb = sinon.stub(sidebar, 'setupSidebar');
    setupExt(mockContext, 'en');

    sinon.assert.calledOnce(stubRc);
    sinon.assert.calledOnce(stubWv);
    sinon.assert.calledOnce(stubSb);

    // TODO - Fix assert
    // sinon.assert.calledWith(stubRc, mockContext, new PackageList(mockContext));
    sinon.assert.calledWith(stubWv, mockContext);
    // TODO - Fix assert
    // sinon.assert.calledWith(stubSb, mockContext, undefined, new PackageList(mockContext));

    stubRc.restore();
    stubWv.restore();
    stubSb.restore();
  });
});
