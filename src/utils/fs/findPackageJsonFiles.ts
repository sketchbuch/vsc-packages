import { collectFilesFromFolder, checkFile } from '.';
import { FS_PACKAGEJSON } from '../../constants';
import { WsFiles } from '../../types';

export const findPackageJsonFiles = (
  folder: string,
  maxDepth: number,
  collectedWsFolders: string[]
): WsFiles => {
  const { isFolder } = checkFile(folder);

  if (isFolder) {
    return collectFilesFromFolder(folder, FS_PACKAGEJSON, maxDepth, 0, collectedWsFolders);
  }

  return [];
};
