import { registerCommands, setupSidebar } from '../utils';
import { extViews } from '../constants';

export const setupExt = () => {
  registerCommands();
  setupSidebar(extViews);
};

export const activate = (): void => {
  setupExt();
};

export default activate;
