import { Cmd, ExtViews } from '../types';
import { cmdList, registerCommands } from '../commands';
import { extViews } from '../constants';
import { setupSidebar } from '../utils';

export const setupExt = (cmdList: Cmd[], extViews: ExtViews) => {
  registerCommands(cmdList);
  setupSidebar(extViews);
};

export const activate = (): void => {
  setupExt(cmdList, extViews);
};

export default activate;
