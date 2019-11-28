import * as fs from 'fs';

const pathExists = (pathStr: string): boolean => {
  try {
    fs.accessSync(pathStr);
  } catch (err) {
    return false;
  }

  return true;
};

export default pathExists;
