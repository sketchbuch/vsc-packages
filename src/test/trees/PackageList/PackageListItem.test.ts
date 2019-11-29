import * as vscode from 'vscode';
import { expect } from 'chai';
import PackageListItem from '../../../trees/PackageList/PackageListItem';
import { EXT_PACKAGELIST_ITEM_CTX } from '../../../constants';

suite('PackageListItem()', () => {
  const label = 'test-package';
  const version = '1.0.0';
  const newItem = new PackageListItem(label, version, vscode.TreeItemCollapsibleState.Collapsed);

  test('tooltip is correct', () => {
    expect(newItem.tooltip).to.be.equal(`${label} (${version})`);
  });

  test('description is correct', () => {
    expect(newItem.description).to.be.equal(`${version}`);
  });

  test('iconPath light is correct', () => {
    expect(newItem.iconPath.light).to.be.equal('../../../resources/light/activitybar-light.svg');
  });

  test('iconPath dark is correct', () => {
    expect(newItem.iconPath.dark).to.be.equal('../../../resources/dark/activitybar-dark.svg');
  });

  test('contextValue is correct', () => {
    expect(newItem.contextValue).to.be.equal(EXT_PACKAGELIST_ITEM_CTX);
  });
});
