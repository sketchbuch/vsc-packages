import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { EXT_ACTIVITYBAR_FOLDERS, EXT_ACTIVITYBAR_PACKAGEJSON } from '../../constants';
import { mockContext } from '../mocks';
import * as sidebar from '../../sidebar';
import { FolderList, PackageList } from '../../treeviews';

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

  /* test('Calls getPackageJson()', () => {
    const spy = sinon.spy(utils, 'getPackageJson');
    setupSidebar(mockContext, undefined);

    sinon.assert.callCount(spy, 1);
    spy.restore();
  });

  test('Sets up tree providers correctly', () => {
    const viewCount = Object.keys(extViews).length;
    const spy = sinon.spy(vscode.window, 'registerTreeDataProvider');
    const spyContext = sinon.spy(sidebar, 'setViewContext');
    setupSidebar(mockContext, undefined);

    sinon.assert.callCount(spy, viewCount);
    sinon.assert.callCount(spyContext, viewCount);
    spy.restore();
  });

  suite('File Watcher:', () => {
    test('Not created if there are no workspace folders', () => {
      const spy = sinon.spy(vscode.workspace, 'createFileSystemWatcher');
      setupSidebar(mockContext, undefined);

      sinon.assert.callCount(spy, 0);
      spy.restore();
    });

    test('Created if there are workspace folders', () => {
      const spy = sinon.spy(vscode.workspace, 'createFileSystemWatcher');
      setupSidebar(mockContext, [
        {
          uri: {
            fsPath: '',
          } as vscode.Uri,
          name: 'test',
          index: 0,
        },
      ]);

      sinon.assert.callCount(spy, 1);
      spy.restore();
    });
  }); */
});
