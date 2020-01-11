import * as vscode from 'vscode';
import Package from '../../webviews/Package/Package';
import { CmdCallback, CmdCallbackData } from '../../types';

const cmdDisplayPackage: CmdCallback = (
  data: CmdCallbackData,
  context: vscode.ExtensionContext
): void => {
  Package.createOrShow(data, context);
};

export default cmdDisplayPackage;
