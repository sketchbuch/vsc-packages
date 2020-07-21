import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { EXT_ACTIVITYBAR_FOLDERS, EXT_ACTIVITYBAR_PACKAGEJSON } from '../../../constants';
import { mockContext } from '../../mocks';
import * as sidebar from '../../../sidebar';
import { FolderList, PackageList } from '../../../treeviews';

suite('setupSidebar()', () => {
  const setupSidebar = sidebar.setupSidebar;

  test('Sets up tree providers correctly', () => {
    const spy = sinon.spy(vscode.window, 'registerTreeDataProvider');

    setupSidebar(mockContext, undefined, new PackageList(mockContext));

    sinon.assert.callCount(spy, 2);
    const spyFolderArgs = spy.getCall(0).args;
    const spyPackageArgs = spy.getCall(1).args;
    expect(spyFolderArgs[0]).to.equal(EXT_ACTIVITYBAR_FOLDERS);
    expect(spyFolderArgs[1]).to.be.an.instanceof(FolderList);
    expect(spyPackageArgs[0]).to.equal(EXT_ACTIVITYBAR_PACKAGEJSON);
    expect(spyPackageArgs[1]).to.be.an.instanceof(PackageList);

    spy.restore();
  });
});
