import * as vscode from 'vscode';
import { expect } from 'chai';
import { mockWorkspaceFolder } from '..';

suite('mockWorkspaceFolder()', () => {
  test('Returns an object', () => {
    expect(mockWorkspaceFolder()).to.be.an('object');
  });

  test('Shape is as expected when !fakeFolder', () => {
    expect(mockWorkspaceFolder()).to.be.eql({
      index: 0,
      name: 'folder',
      uri: {
        fsPath: `${__dirname}/../../../src/test/mocks`.replace('mocks/tests', 'mocks'),
        path: `${__dirname}/../../../src/test/mocks`.replace('mocks/tests', 'mocks'),
        scheme: 'file',
      } as vscode.Uri,
    });
  });

  test('Shape is as expected when fakeFolder', () => {
    expect(mockWorkspaceFolder(true)).to.be.eql({
      index: 0,
      name: 'folder',
      uri: {
        fsPath: '/some/folder',
        path: '/some/folder',
        scheme: 'file',
      } as vscode.Uri,
    });
  });
});
