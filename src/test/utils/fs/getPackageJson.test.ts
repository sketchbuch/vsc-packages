import * as fs from 'fs';
import * as path from 'path';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { expect } from 'chai';
import * as pathExists from '../../../utils/fs/pathExists';
import getPackageJson from '../../../utils/fs/getPackageJson';
import { FS_PACKAGEJSON, FS_UTF8 } from '../../../constants';

suite('utils/fs: getPackageJson()', () => {
  const mockWorkspaceFolder: vscode.WorkspaceFolder = {
    index: 0,
    name: 'folder',
    uri: {
      fsPath: `${__dirname}/../../../../src/test/utils/fs`,
      path: `${__dirname}/../../../../src/test/utils/fs`,
      scheme: 'file',
    } as vscode.Uri,
  };

  const testPath = path.join(mockWorkspaceFolder.uri.fsPath, FS_PACKAGEJSON);

  test('Correctly calls path.join() once', () => {
    const spy = sinon.spy(path, 'join');
    getPackageJson(mockWorkspaceFolder);

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, mockWorkspaceFolder.uri.fsPath, FS_PACKAGEJSON);
    spy.restore();
  });

  test('Correctly calls pathExists() once', () => {
    const spy = sinon.spy(pathExists, 'pathExists');
    getPackageJson(mockWorkspaceFolder);

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, testPath);
    spy.restore();
  });

  test('Returns null if the workspace folder does NOT exist', () => {
    const mockNonexistentWorkspaceFolder: vscode.WorkspaceFolder = {
      index: 0,
      name: 'folder',
      uri: {
        fsPath: '/some/folder/',
        path: '/some/folder/',
        scheme: 'file',
      } as vscode.Uri,
    };

    const result = getPackageJson(mockNonexistentWorkspaceFolder);
    expect(result).to.be.null;
  });

  suite('If package.json file exists:', () => {
    test('Calls JSON.parse() once', () => {
      const spy = sinon.spy(JSON, 'parse');
      getPackageJson(mockWorkspaceFolder);

      sinon.assert.calledOnce(spy);
      spy.restore();
    });

    test('Correctly calls fs.readFileSync() once', () => {
      const spy = sinon.spy(fs, 'readFileSync');
      getPackageJson(mockWorkspaceFolder);

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, testPath, FS_UTF8);
      spy.restore();
    });

    test('Returns passed JSON from the existing file', () => {
      const result = getPackageJson(mockWorkspaceFolder);
      expect(result).to.be.eql({ test: true });
    });
  });
});
