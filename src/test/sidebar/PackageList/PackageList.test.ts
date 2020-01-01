import * as vscode from 'vscode';
import { expect } from 'chai';
import { extensionPath, mockWorkspaceFolder } from '../../mocks';
import { PackageList, PackageListItem } from '../../../sidebar';

suite('PackageList()', function() {
  const packageKey = 'dependencies';
  const newList = new PackageList(packageKey, null, extensionPath);

  test('getTreeItem() returns the element', () => {
    const label = 'test-package';
    const version = '1.0.0';
    const element = new PackageListItem(
      label,
      version,
      extensionPath,
      vscode.TreeItemCollapsibleState.Collapsed
    );
    const elementReturned = newList.getTreeItem(element);
    expect(elementReturned).to.be.equal(element);
  });

  suite('getChildren()', () => {
    test('Returns the empty message if workspaceFolders = null', async () => {
      const children = await newList.getChildren();
      expect(children.length).to.be.equal(1);
      expect(children[0].label).to.be.equal(`No ${packageKey} found`);
    });

    test('Returns 1 list item with the correct information if workspaceFolders !== null', async () => {
      const mockWsFolder = mockWorkspaceFolder();
      const newList = new PackageList(packageKey, [mockWsFolder], extensionPath);
      const children = await newList.getChildren();
      expect(children.length).to.be.equal(1);
      expect(children[0].label).to.be.equal('react');
      expect(children[0].version).to.be.equal('1.0.1');
    });
  });
});
