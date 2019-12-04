import * as vscode from 'vscode';
import { expect } from 'chai';
import { PackageList, PackageListItem } from '../../../sidebar';
import { mockWorkspaceFolder } from '../../mocks';

suite('PackageList()', function() {
  const packageKey = 'dependencies';
  const newList = new PackageList(packageKey, null);

  test('getTreeItem() returns the element', () => {
    const label = 'test-package';
    const version = '1.0.0';
    const element = new PackageListItem(label, version, vscode.TreeItemCollapsibleState.Collapsed);
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
      const newList = new PackageList(packageKey, [mockWsFolder]);
      const children = await newList.getChildren();
      expect(children.length).to.be.equal(1);
      expect(children[0].label).to.be.equal('react');
      expect(children[0].version).to.be.equal('1.0.1');
    });
  });
});
