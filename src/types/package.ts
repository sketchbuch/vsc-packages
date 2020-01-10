import { NpmPackageData } from './';

export interface PackageState {
  data?: NpmPackageData;
  error?: Error;
}

export interface InlineListSnippet {
  email?: string;
  label: string;
  url?: string;
}

export interface InlineListSnippet {
  email?: string;
  label: string;
  url?: string;
}

export interface TableListSnippet {
  label: string;
  value: string;
}

export interface TabboxButton {
  label: string;
  selected: boolean;
}

export type TabboxId = 'readme' | 'versions' | 'developers';

export interface TabboxItem {
  button: TabboxButton;
  content: () => string;
  emptyMessage: string;
  id: TabboxId;
}

export type TabboxItems = TabboxItem[];

export interface TabMessage {
  activeTab: TabboxId;
}

export type Snippets =
  | 'authorSnippet'
  | 'bugsSnippet'
  | 'columnsSnippet'
  | 'contribSnippet'
  | 'homepageSnippet'
  | 'inlineListSnippet'
  | 'licenseSnippet'
  | 'maintainerSnippet'
  | 'messageSnippet'
  | 'readmeSnippet'
  | 'repositorySnippet'
  | 'tabboxSnippet'
  | 'tableListSnippet'
  | 'tagsSnippet'
  | 'timeSnippet';
