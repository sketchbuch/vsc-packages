import { expect } from 'chai';
import * as path from 'path';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import {
  CMD_VSCODE_OPEN_WV,
  EXT_GLOBALSTATE_KEY,
  EXT_GLOBALSTATE_VERSION_KEY,
  FS_FOLDER_CSS,
  FS_FOLDER_JS,
  FS_FOLDER_RESOURCES,
} from '../../../constants';
import { extensionPath, mockContext, mockPackageData, mockPanel } from '../../mocks';
import { GetHtml } from '../../../types';
import * as templates from '../../../templates/package';
import * as utils from '../../../utils';
import { Package, defaultPackageData } from '../../../webviews';

suite('Package()', () => {
  test('Creating an instance is successful', () => {
    expect(() => new Package(mockPackageData, mockPanel, mockContext)).not.to.throw();
  });

  suite('constructor()', () => {
    test('Public properties are set to defaults', () => {
      new Package(mockPackageData, mockPanel, mockContext);

      expect(Package.currentPanel).to.equal(undefined);
      expect(Package.currentPackageData).to.eql(defaultPackageData);
      expect(Package.viewType).to.equal(CMD_VSCODE_OPEN_WV);
    });

    test('Calls panel.onDidDispose() && panel.onDidChangeViewState()', () => {
      const spyOnDidChangeViewState = sinon.spy(mockPanel, 'onDidChangeViewState');
      const spyOnDidDispose = sinon.spy(mockPanel, 'onDidDispose');

      new Package(mockPackageData, mockPanel, mockContext);

      sinon.assert.calledOnce(spyOnDidChangeViewState);
      sinon.assert.calledOnce(spyOnDidDispose);

      spyOnDidChangeViewState.restore();
      spyOnDidDispose.restore();
    });
  });

  suite('createOrShow()', () => {
    test('Calls createWebviewPanel() correctly', () => {
      const spy = sinon.spy(vscode.window, 'createWebviewPanel');
      Package.createOrShow(mockPackageData, mockContext);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(
        spy,
        Package.viewType,
        utils.getPackageTabTitle(mockPackageData.packageName),
        vscode.ViewColumn.Active,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(
              path.join(mockContext.extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS)
            ),
            vscode.Uri.file(
              path.join(mockContext.extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS)
            ),
          ],
        }
      );
      spy.restore();
    });

    test('Calls setStateForRevival() correctly', () => {
      const spy = sinon.spy(Package, 'setStateForRevival');
      Package.createOrShow(mockPackageData, mockContext);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, mockPackageData, mockContext);
      spy.restore();
    });
  });

  suite('setStateForRevival()', () => {
    test('Calls setStateForRevival() correctly', () => {
      const spy = sinon.spy(Package, 'setStateForRevival');
      Package.revive(mockPackageData, mockPanel, mockContext);
      sinon.assert.calledTwice(spy); // Once also in _update which is triggered
      sinon.assert.calledWith(spy, mockPackageData, mockContext);
      spy.restore();
    });
  });

  suite('setStateForRevival()', () => {
    test('Calls context.globalState.update correctly', () => {
      const spy = sinon.spy(mockContext.globalState, 'update');
      Package.setStateForRevival(mockPackageData, mockContext);
      sinon.assert.calledTwice(spy);

      const callArgs1 = spy.getCall(0).args;
      const callArgs2 = spy.getCall(1).args;
      expect(callArgs1[0]).to.equal(EXT_GLOBALSTATE_KEY);
      expect(callArgs1[1]).to.equal(mockPackageData.packageName);
      expect(callArgs2[0]).to.equal(EXT_GLOBALSTATE_VERSION_KEY);
      expect(callArgs2[1]).to.equal(mockPackageData.packageVersion);
      spy.restore();
    });
  });

  suite('dispose()', () => {
    test('Resets Package.currentPanel', () => {
      const instance = new Package(mockPackageData, mockPanel, mockContext);
      instance.dispose();
      expect(Package.currentPanel).to.equal(undefined);
    });

    test('Resets Package.currentPackageData', () => {
      const instance = new Package(mockPackageData, mockPanel, mockContext);
      instance.dispose();
      expect(Package.currentPackageData).to.eql(defaultPackageData);
    });

    test('Calls _panel.dispose() once', () => {
      const spy = sinon.spy(mockPanel, 'dispose');
      const instance = new Package(mockPackageData, mockPanel, mockContext);
      instance.dispose();
      sinon.assert.calledOnce(spy);
      spy.restore();
    });
  });

  suite('_getHtmlForWebview()', () => {
    test('Calls getHtml() correctly', () => {
      const spy = sinon.spy(templates, 'getHtml');
      const getHtmlArgs: GetHtml = {
        getTemplate: templates.getTemplate,
        extensionPath,
        htmlData: {
          activeTab: 'readme',
          packageData: mockPackageData,
          state: {
            data: undefined,
            error: undefined,
          },
        },
      };
      new Package(mockPackageData, mockPanel, mockContext);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, getHtmlArgs);
      spy.restore();
    });
  });
});
