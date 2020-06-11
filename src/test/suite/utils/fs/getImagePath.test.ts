import { extensionPath } from '../../../mocks';
import { getImagePath } from '../../../../utils';
import { expect } from 'chai';
import { FS_FOLDER_IMAGES, FS_FOLDER_RESOURCES } from '../../../../constants';

suite('getImagePath()', () => {
  test('Returns the expected image path', () => {
    const result = getImagePath(extensionPath, 'light', 'icon.png');
    expect(result).to.equal(
      `${extensionPath}/${FS_FOLDER_RESOURCES}/${FS_FOLDER_IMAGES}/light/icon.png`
    );
  });
});
