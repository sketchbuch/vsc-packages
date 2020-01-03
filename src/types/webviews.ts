import { PackageState, TabboxId } from './';

export interface GetTemplate {
  cssPath: string;
  htmlData: HtmlData;
  nonce: string;
  scriptPath: string;
}

export interface HtmlData {
  activeTab: TabboxId;
  packageName: string;
  state: PackageState;
}

export interface GetHtml {
  extensionPath: string;
  getTemplate: (args: GetTemplate) => string;
  htmlData: HtmlData;
}
