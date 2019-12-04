import * as sinon from 'sinon';
import { expect } from 'chai';
import { CMD_VSCODE_OPEN_WV } from '../../../constants';
import { Package } from '../../../webviews';
import { mockContext, mockPanel, packageName } from '../../mocks';

suite('Package()', () => {
  test('Creating an instance is successful', () => {
    expect(() => new Package(packageName, mockPanel, mockContext)).not.to.throw();
  });

  suite('constructor()', () => {
    test('Public properties are set to defaults', () => {
      new Package(packageName, mockPanel, mockContext);

      expect(Package.currentPanel).to.equal(undefined);
      expect(Package.currentPackage).to.equal('');
      expect(Package.viewType).to.equal(CMD_VSCODE_OPEN_WV);
    });

    test('Calls panel.onDidDispose() && panel.onDidChangeViewState()', () => {
      const spyOnDidChangeViewState = sinon.spy(mockPanel, 'onDidChangeViewState');
      const spyOnDidDispose = sinon.spy(mockPanel, 'onDidDispose');

      new Package(packageName, mockPanel, mockContext);

      sinon.assert.calledOnce(spyOnDidChangeViewState);
      sinon.assert.calledOnce(spyOnDidDispose);

      spyOnDidChangeViewState.restore();
      spyOnDidDispose.restore();
    });
  });
});
