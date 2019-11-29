import { registerCommands, setupSidebar } from '../utils';

export const activate = (): void => {
  registerCommands();
  setupSidebar();
};

export default activate;
