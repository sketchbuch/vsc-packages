/* eslint-disable @typescript-eslint/no-unused-vars */
import * as vscode from 'vscode';
import { extensionPath } from '.';

const mockContext = {
  asAbsolutePath: (relativePath: string) => relativePath,
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
  globalStorageUri: {} as vscode.Uri,
  logPath: '',
  logUri: {} as vscode.Uri,
  storagePath: '',
  storageUri: undefined,
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
