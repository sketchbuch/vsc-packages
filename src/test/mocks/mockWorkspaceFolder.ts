import * as vscode from 'vscode';

const mockWorkspaceFolder = (fakeFolder = false): vscode.WorkspaceFolder => {
  return {
    index: 0,
    name: 'folder',
    uri: {
      fsPath: fakeFolder ? '/some/folder' : `${__dirname}/../../../src/test/mocks`,
      path: fakeFolder ? '/some/folder' : `${__dirname}/../../../src/test/mocks`,
      scheme: 'file',
    } as vscode.Uri,
  };
};

export default mockWorkspaceFolder;
