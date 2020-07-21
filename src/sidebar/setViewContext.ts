import * as vscode from 'vscode';
import { EXT } from '../constants';
import { ExtDepTypes, GetPackageJsonResult } from '../types';
import { shouldShowView } from './shouldShowView';

export const setViewContext = (view: string, packageJson: GetPackageJsonResult): void => {
  vscode.commands.executeCommand(
    'setContext',
    `${EXT}-${view}`,
    shouldShowView(view as ExtDepTypes, packageJson)
  );
};
