import { WsFolder } from '../../treeviews/FolderList/FolderList.interface';

export const sortWsFolders = (a: WsFolder, b: WsFolder): number => {
  if (a.hasOwnProperty('name') && b.hasOwnProperty('name')) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
  }

  return -1;
};
