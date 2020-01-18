import * as vscode from 'vscode';
import { EXT } from '../constants';
import { ExtViewList, GetPackageJsonResult } from '../types';
import { shouldShowView } from './';

export const setViewContext = (view: string, packageJson: GetPackageJsonResult) => {
  vscode.commands.executeCommand(
    'setContext',
    `${EXT}-${view}`,
    shouldShowView(view as ExtViewList, packageJson)
  );
};
