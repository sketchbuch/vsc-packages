import { WsFolder } from '../../treeviews/FolderList/FolderList.interface';

// TODO - if the same, 0 should be returned
export const sortWsFolders = (a: WsFolder, b: WsFolder): number => {
  if (a.hasOwnProperty('name') && b.hasOwnProperty('name')) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
  }

  return -1;
};
