import * as vscode from 'vscode';
import { extensionPath } from '.';

const mockContext = {
  asAbsolutePath: (relativePath: string) => relativePath,
  extensionPath,
  globalState: {} as vscode.Memento,
  globalStoragePath: '',
  logPath: '',
  storagePath: '',
  subscriptions: [],
  workspaceState: {} as vscode.Memento,
} as vscode.ExtensionContext;

export default { ...mockContext };
