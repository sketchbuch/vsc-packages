/* eslint-disable @typescript-eslint/no-unused-vars */
import * as vscode from 'vscode';
import { extensionPath } from '.';

const mockContext = {
  asAbsolutePath: (relativePath: string) => relativePath,
  environmentVariableCollection: {},
  extensionPath,
  extensionUri: {} as vscode.Uri,
  globalState: {
    get: (key: string) => {
      // Do nothing...
    },
    update: (key: string, value: never) => {
      // Do nothing...
    },
  } as vscode.Memento & { setKeysForSync(keys: string[]): void },
  globalStoragePath: '',
  logPath: '',
  storagePath: '',
  storageUri: undefined,
  globalStorageUri: {} as vscode.Uri,
  logUri: {} as vscode.Uri,
  subscriptions: [],
  workspaceState: {
    get: (key: string) => {
      // Do nothing...
    },
    update: (key: string, value: never) => {
      // Do nothing...
    },
  } as vscode.Memento,
} as vscode.ExtensionContext;

export default { ...mockContext };
