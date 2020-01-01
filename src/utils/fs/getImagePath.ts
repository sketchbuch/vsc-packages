import * as path from 'path';
import { FS_FOLDER_IMAGES, FS_FOLDER_RESOURCES } from '../../constants';
import { ImgType } from '../../types/ext';

const getImagePath = (extensionPath: string, imgType: ImgType, fileName: string): string => {
  return path.join(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_IMAGES, imgType, fileName);
};

export default getImagePath;
