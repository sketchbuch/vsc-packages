/* import * as vscode from 'vscode';
import { expect } from 'chai';
import { extensionPath } from '../../mocks';
import {
  EXT_PACKAGELIST_ITEM_CTX,
  FS_FOLDER_IMAGES,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
  FS_FOLDER_RESOURCES,
} from '../../../constants';
import { PackageListItem } from '../../../treeviews';

suite('PackageListItem()', () => {
  const label = 'test-package';
  const version = '1.0.0';
  const newItem = new PackageListItem(
    label,
    version,
    extensionPath,
    vscode.TreeItemCollapsibleState.Collapsed
  );

  test('tooltip is correct', () => {
    expect(newItem.tooltip).to.be.equal(`${label} (${version})`);
  });

  test('description is correct', () => {
    expect(newItem.description).to.be.equal(`${version}`);
  });

  test('iconPath light is correct', () => {
    expect(newItem.iconPath.light).to.be.equal(
      `${extensionPath}/${FS_FOLDER_RESOURCES}/${FS_FOLDER_IMAGES}/${FS_FOLDER_IMAGES_LIGHT}/activitybar-light.svg`
    );
  });

  test('iconPath dark is correct', () => {
    expect(newItem.iconPath.dark).to.be.equal(
      `${extensionPath}/${FS_FOLDER_RESOURCES}/${FS_FOLDER_IMAGES}/${FS_FOLDER_IMAGES_DARK}/activitybar-dark.svg`
    );
  });

  test('contextValue is correct', () => {
    expect(newItem.contextValue).to.be.equal(EXT_PACKAGELIST_ITEM_CTX);
  });
});
 */
