import { checkFile } from '.';
import { WsFiles } from '../../types';

export const getFilenamesOfType = (
  requiredType: 'folders' | 'files',
  filenames: WsFiles,
  folder: string,
  fileType: string
): WsFiles => {
  return filenames.reduce((allFiles, curFile): WsFiles => {
    const curPath = `${folder}/${curFile}`;
    const { isFile, isFolder } = checkFile(`${folder}/${curFile}`);

    if (isFile && requiredType === 'files') {
      if (curFile === fileType) {
        return [...allFiles, curPath];
      }
    } else if (isFolder && requiredType === 'folders') {
      return [...allFiles, curPath];
    }

    return allFiles;
  }, [] as WsFiles);
};
