import { Cmd } from '../types';
import { CMD_DISPLAY_PACKAGE, CMD_OPEN_NPM } from '../constants';
import { cmdDisplayPackage, cmdOpenNpm } from '.';

export const cmdList: Cmd[] = [
  {
    cmd: CMD_DISPLAY_PACKAGE,
    callback: cmdDisplayPackage,
  },
  {
    cmd: CMD_OPEN_NPM,
    callback: cmdOpenNpm,
  },
];

export default cmdList;
