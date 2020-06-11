import * as path from 'path';

export const extensionPath = path.resolve(`${__dirname}/../../..`);
export const packageName = 'vsc-quokka-statusbar';

export { default as mockContext } from './mockContext';
export { default as mockContributors } from './mockContributors';
export { default as mockInlineListContributors } from './mockInlineListContributors';
export { default as mockInlineListMaintainers } from './mockInlineListMaintainers';
export { default as mockMaintainers } from './mockMaintainers';
export { default as mockNpmData } from './mockNpmData';
export { default as mockPackageData } from './mockPackageData';
export { default as mockPanel } from './mockPanel';
export { default as mockTabBoxItems } from './mockTabBoxItems';
export { default as mockTableListItems } from './mockTableListItems';
export { default as mockTags } from './mockTags';
export { default as mockWorkspaceFolder } from './mockWorkspaceFolder';
