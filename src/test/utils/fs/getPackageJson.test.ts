import * as fs from 'fs';
import * as path from 'path';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as pathExists from '../../../utils/fs/pathExists';
import getPackageJson from '../../../utils/fs/getPackageJson';
import mockWorkspaceFolder from '../../mocks/mockWorkspaceFolder';
import { FS_PACKAGEJSON, FS_UTF8 } from '../../../constants';

suite('getPackageJson()', () => {
  const mockWsFolder = mockWorkspaceFolder();

  const testPath = path.join(mockWsFolder.uri.fsPath, FS_PACKAGEJSON);

  test('Correctly calls path.join() once', () => {
    const spy = sinon.spy(path, 'join');
    getPackageJson(mockWsFolder);

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, mockWsFolder.uri.fsPath, FS_PACKAGEJSON);
    spy.restore();
  });

  test('Correctly calls pathExists() once', () => {
    const spy = sinon.spy(pathExists, 'pathExists');
    getPackageJson(mockWsFolder);

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, testPath);
    spy.restore();
  });

  test('Returns null if the workspace folder does NOT exist', () => {
    const mockNonexistentWorkspaceFolder = mockWorkspaceFolder(true);

    const result = getPackageJson(mockNonexistentWorkspaceFolder);
    expect(result).to.be.null;
  });

  suite('If package.json file exists:', () => {
    test('Calls JSON.parse() once', () => {
      const spy = sinon.spy(JSON, 'parse');
      getPackageJson(mockWsFolder);

      sinon.assert.calledOnce(spy);
      spy.restore();
    });

    test('Correctly calls fs.readFileSync() once', () => {
      const spy = sinon.spy(fs, 'readFileSync');
      getPackageJson(mockWsFolder);

      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, testPath, FS_UTF8);
      spy.restore();
    });

    test('Returns passed JSON from the existing file', () => {
      const result = getPackageJson(mockWsFolder);
      expect(result).to.be.eql({
        test: true,
        dependencies: {
          react: '1.0.1',
        },
        devDependencies: {
          'react-dom': '1.0.1',
        },
      });
    });
  });
});
