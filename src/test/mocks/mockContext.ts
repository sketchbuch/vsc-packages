import * as vscode from 'vscode';
import { extensionPath } from '.';

const mockContext = {
  asAbsolutePath: (relativePath: string) => relativePath,
  extensionPath,
  globalState: {
    get: (key: string) => {},
    update: (key: string, value: any) => {},
  } as vscode.Memento,
  globalStoragePath: '',
  logPath: '',
  storagePath: '',
  subscriptions: [],
  workspaceState: {
    get: (key: string) => {},
    update: (key: string, value: any) => {},
  } as vscode.Memento,
} as vscode.ExtensionContext;

export default { ...mockContext };
