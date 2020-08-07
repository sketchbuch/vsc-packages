/* import { expect } from 'chai';
import * as path from 'path';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import {
  CMD_DISPLAY_PACKAGE_WV,
  EXT_GLOBALSTATE_KEY,
  EXT_GLOBALSTATE_VERSION_KEY,
  FS_FOLDER_CSS,
  FS_FOLDER_JS,
  FS_FOLDER_RESOURCES,
} from '../../../../constants';
import { extensionPath, mockContext, mockPackageData, mockPanel } from '../../mocks';
import { GetHtml, PackageHtmlData } from '../../../../types';
import * as templates from '../../../../templates';
import * as utils from '../../../../utils';
import { PackageItem, defaultPackageData } from '../../../../webviews';
import { defaultTemplate } from '../../../../templates/package';

suite('PackageItem()', () => {
  test('Creating an instance is successful', () => {
    expect(() => new PackageItem(mockPackageData, mockPanel, mockContext)).not.to.throw();
  });

  suite('constructor()', () => {
    test('Public properties are set to defaults', () => {
      new PackageItem(mockPackageData, mockPanel, mockContext);

      expect(PackageItem.currentPanel).to.equal(undefined);
      expect(PackageItem.currentPackageData).to.eql(defaultPackageData);
      expect(PackageItem.viewType).to.equal(CMD_DISPLAY_PACKAGE_WV);
    });

    test('Calls panel.onDidDispose() && panel.onDidChangeViewState()', () => {
      const spyOnDidChangeViewState = sinon.spy(mockPanel, 'onDidChangeViewState');
      const spyOnDidDispose = sinon.spy(mockPanel, 'onDidDispose');

      new PackageItem(mockPackageData, mockPanel, mockContext);

      sinon.assert.calledOnce(spyOnDidChangeViewState);
      sinon.assert.calledOnce(spyOnDidDispose);

      spyOnDidChangeViewState.restore();
      spyOnDidDispose.restore();
    });
  });

  suite('createOrShow()', () => {
    test('Calls createWebviewPanel() correctly', () => {
      const spy = sinon.spy(vscode.window, 'createWebviewPanel');
      PackageItem.createOrShow(mockPackageData, mockContext);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(
        spy,
        PackageItem.viewType,
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
      const spy = sinon.spy(PackageItem, 'setStateForRevival');
      PackageItem.createOrShow(mockPackageData, mockContext);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, mockPackageData, mockContext);
      spy.restore();
    });
  });

  suite('setStateForRevival()', () => {
    test('Calls setStateForRevival() correctly', () => {
      const spy = sinon.spy(PackageItem, 'setStateForRevival');
      PackageItem.revive(mockPackageData, mockPanel, mockContext);
      sinon.assert.calledTwice(spy); // Once also in _update which is triggered
      sinon.assert.calledWith(spy, mockPackageData, mockContext);
      spy.restore();
    });
  });

  suite('setStateForRevival()', () => {
    test('Calls context.globalState.update correctly', () => {
      const spy = sinon.spy(mockContext.globalState, 'update');
      PackageItem.setStateForRevival(mockPackageData, mockContext);
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
    test('Resets PackageItem.currentPanel', () => {
      const instance = new PackageItem(mockPackageData, mockPanel, mockContext);
      instance.dispose();
      expect(PackageItem.currentPanel).to.equal(undefined);
    });

    test('Resets PackageItem.currentPackageData', () => {
      const instance = new PackageItem(mockPackageData, mockPanel, mockContext);
      instance.dispose();
      expect(PackageItem.currentPackageData).to.eql(defaultPackageData);
    });

    test('Calls _panel.dispose() once', () => {
      const spy = sinon.spy(mockPanel, 'dispose');
      const instance = new PackageItem(mockPackageData, mockPanel, mockContext);
      instance.dispose();
      sinon.assert.calledOnce(spy);
      spy.restore();
    });
  });

  suite('_getHtmlForWebview()', () => {
    test('Calls getHtml() correctly', () => {
      const spy = sinon.spy(templates, 'getHtml');
      const getHtmlArgs: GetHtml<PackageHtmlData> = {
        template: defaultTemplate,
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
      new PackageItem(mockPackageData, mockPanel, mockContext);
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, getHtmlArgs);
      spy.restore();
    });
  });
});
 */
