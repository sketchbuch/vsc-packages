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

export interface TableListSnippet {
  label: string;
  value: string;
}

export interface TabboxButton {
  label: string;
  selected: boolean;
}

export type TabboxId = 'readme' | 'versions' | 'dependents';

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
