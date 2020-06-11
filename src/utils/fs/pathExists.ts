import * as fs from 'fs';

export const pathExists = (pathStr: string): boolean => {
  try {
    fs.accessSync(pathStr);
  } catch (err) {
    return false;
  }

  return true;
};
