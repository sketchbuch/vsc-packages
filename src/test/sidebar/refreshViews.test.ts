import * as sinon from 'sinon';
import { extensionPath } from '../mocks';
import { extViews } from '../../constants';
import { PackageList } from '../../treeviews';
import * as sidebar from '../../sidebar';
import * as utils from '../../utils';

suite('refreshViews()', () => {
  const viewCount = Object.keys(extViews).length;
  const refreshViews = sidebar.refreshViews;

  const mockTreeProviders = {
    dependencies: new PackageList('dependencies', {}, extensionPath),
    devDependencies: new PackageList('devDependencies', {}, extensionPath),
    peerDependencies: new PackageList('peerDependencies', {}, extensionPath),
    optionalDependencies: new PackageList('optionalDependencies', {}, extensionPath),
  };

  test('Calls getPackageJson()', () => {
    const spy = sinon.spy(utils, 'getPackageJson');
    refreshViews(extViews, mockTreeProviders);

    sinon.assert.callCount(spy, 1);
    spy.restore();
  });

  test('Calls setViewContext the correct number of times', () => {
    const spy = sinon.spy(sidebar, 'setViewContext');
    refreshViews(extViews, mockTreeProviders);

    sinon.assert.callCount(spy, viewCount);
    spy.restore();
  });

  test('Calls PackageList.refresh the correct number of times', () => {
    const spyDep = sinon.spy(mockTreeProviders['dependencies'], 'refresh');
    const spydevDep = sinon.spy(mockTreeProviders['devDependencies'], 'refresh');
    const spyPeerDep = sinon.spy(mockTreeProviders['peerDependencies'], 'refresh');
    const spyOptDep = sinon.spy(mockTreeProviders['optionalDependencies'], 'refresh');
    refreshViews(extViews, mockTreeProviders);

    sinon.assert.callCount(spyDep, 1);
    sinon.assert.callCount(spydevDep, 1);
    sinon.assert.callCount(spyPeerDep, 1);
    sinon.assert.callCount(spyOptDep, 1);
    spyDep.restore();
    spydevDep.restore();
    spyPeerDep.restore();
    spyOptDep.restore();
  });
});
