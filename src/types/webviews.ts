import { PackageState, TabboxId, CmdCallbackData } from './';

export interface GetTemplate {
  cssPath: string;
  htmlData: HtmlData;
  nonce: string;
  scriptPath: string;
}

export interface HtmlData {
  activeTab: TabboxId;
  packageData: CmdCallbackData;
  state: PackageState;
}

export interface GetHtml {
  extensionPath: string;
  getTemplate: (args: GetTemplate) => string;
  htmlData: HtmlData;
}
