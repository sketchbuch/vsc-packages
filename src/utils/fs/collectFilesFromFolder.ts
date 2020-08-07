import * as fs from 'fs';
import { getFilenamesOfType, isHiddenFile } from '.';
import { WsFiles } from '../../types';

const foldersToIgnore = ['build', 'dist', 'node_modules', 'out', 'public'];

export const collectFilesFromFolder = (
  folder: string,
  fileType: string,
  maxDepth: number,
  curDepth: number,
  collectedWsFolders: string[]
): WsFiles => {
  if (curDepth <= maxDepth && !collectedWsFolders.includes(folder)) {
    try {
      const filenames = fs.readdirSync(folder).reduce((allFiles: string[], curFile) => {
        if (!isHiddenFile(curFile) && !foldersToIgnore.includes(curFile)) {
          return [...allFiles, curFile];
        }

        return allFiles;
      }, []);

      const folders = getFilenamesOfType('folders', filenames, folder, fileType);
      let files = getFilenamesOfType('files', filenames, folder, fileType);

      if (folders.length > 0) {
        for (let index = 0; index < folders.length; index++) {
          const subFiles = collectFilesFromFolder(
            folders[index],
            fileType,
            maxDepth,
            curDepth + 1,
            collectedWsFolders
          );

          files = [...files, ...subFiles];
        }
      }

      return files;
    } catch (err) {
      return [];
    }
  }

  return [];
};
