import * as vscode from 'vscode';

const mockSubscriptions: { dispose(): any }[] = [];

const mockContext: vscode.ExtensionContext = {
  subscriptions: mockSubscriptions,
  extensionPath: '/test/path',
} as vscode.ExtensionContext;

export default mockContext;
