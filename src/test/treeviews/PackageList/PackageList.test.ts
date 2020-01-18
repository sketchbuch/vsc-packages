import { expect } from 'chai';
import * as vscode from 'vscode';
import { extensionPath } from '../../mocks';
import { PackageList, PackageListItem } from '../../../treeviews';

suite('PackageList()', function() {
  const packageView = 'dependencies';
  const newList = new PackageList(packageView, null, extensionPath);

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
      expect(children[0].label).to.be.equal(`No Folder or Workspace opened`);
    });

    test('Returns the error message if reading package.json errored', async () => {
      const errorList = new PackageList(packageView, new Error('An error'), extensionPath);
      const children = await errorList.getChildren();
      expect(children.length).to.be.equal(1);
      expect(children[0].label).to.be.equal(`Error reading package.json`);
    });

    test('Returns 1 list item with the correct information', async () => {
      const mockPackageJson = {
        test: true,
        dependencies: {
          react: '1.0.1',
        },
        devDependencies: {
          'react-dom': '1.0.1',
        },
      };

      const newList = new PackageList(packageView, mockPackageJson, extensionPath);
      const children = await newList.getChildren();
      expect(children.length).to.be.equal(1);
      expect(children[0].label).to.be.equal('react');
      expect(children[0].version).to.be.equal('1.0.1');
    });

    test('Returns 1 list item with no dependencies message correctly', async () => {
      const mockPackageJson = {
        test: true,
      };

      const newList = new PackageList(packageView, mockPackageJson, extensionPath);
      const children = await newList.getChildren();
      expect(children.length).to.be.equal(1);
      expect(children[0].label).to.be.equal(`No ${packageView} found`);
    });
  });
});
