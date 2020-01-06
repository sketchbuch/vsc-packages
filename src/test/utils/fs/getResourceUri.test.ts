import { expect } from 'chai';
import * as vscode from 'vscode';
import { FS_FOLDER_RESOURCES } from '../../../constants';
import { extensionPath } from '../../mocks';
import { getResourceUri } from '../../../utils';

suite.only('getResourceUri()', () => {
  test('Returns the expected path', () => {
    const result = getResourceUri(extensionPath, 'temp');
    expect(result).to.be.an.instanceof(vscode.Uri);
    expect(result.path).to.equal(`${extensionPath}/${FS_FOLDER_RESOURCES}/temp`);
  });
});
