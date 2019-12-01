import * as vscode from 'vscode';

const mockSubscriptions: { dispose(): any }[] = [];

const mockContext: vscode.ExtensionContext = {
  subscriptions: mockSubscriptions,
} as vscode.ExtensionContext;

export default mockContext;
