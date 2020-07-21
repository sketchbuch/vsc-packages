/* import * as trans from 'vscode-ext-localisation';
import { mockContext } from '../../mocks';
import { PackageList } from '../../../treeviews';
import { setupExt } from '../../../core';
import * as commands from '../../../commands';
import * as sidebar from '../../../sidebar';
import * as sinon from 'sinon';
import * as webviews from '../../../webviews'; */

suite('activate()', function() {
  test('setupExt() sets up extension correctly', function() {
    // TODO - Fix test
    /* const stubCommands = sinon.stub(commands, 'registerCommands');
    const stubWebviews = sinon.stub(webviews, 'registerWebviews');
    const stubSidebar = sinon.stub(sidebar, 'setupSidebar');
    const stubTransGetLang = sinon.stub(trans, 'getVscodeLang');
    const stubTransLoad = sinon.stub(trans, 'getVscodeLang');

    setupExt(mockContext, 'en');

    sinon.assert.calledOnce(stubCommands);
    sinon.assert.calledOnce(stubWebviews);
    sinon.assert.calledOnce(stubSidebar);
    sinon.assert.calledOnce(stubTransGetLang);
    sinon.assert.calledOnce(stubTransGetLang);

    sinon.assert.calledOnce(stubCommands);
    sinon.assert.calledOnce(stubWebviews);
    sinon.assert.calledOnce(stubSidebar);

    sinon.assert.calledWith(stubCommands, mockContext, new PackageList(mockContext));
    sinon.assert.calledWith(stubWebviews, mockContext);
    sinon.assert.calledWith(stubSidebar, mockContext, undefined, new PackageList(mockContext));

    stubCommands.restore();
    stubWebviews.restore();
    stubSidebar.restore(); 
    stubTransGetLang.restore();
    stubTransLoad.restore(); */
  });
});
