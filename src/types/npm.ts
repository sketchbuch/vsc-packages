import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';

export interface NpmAuthor {
  name: string;
  url: string;
}

export interface NpmBugs {
  url: string;
}

export interface NpmContributors {
  email?: string;
  githubUsername?: string;
  name: string;
  url?: string;
}

export interface NpmMaintainer {
  email: string;
  name: string;
}

export interface NpmRepository {
  directory?: string;
  type: string;
  url: string;
}

export interface NpmTags {
  [key: string]: string;
}

export interface NpmTime {
  [key: string]: string;
}

export interface NpmUsers {
  [key: string]: boolean;
}

export interface NpmVersions {
  [key: string]: JSONSchemaForNPMPackageJsonFiles;
}

export interface NpmPackageData {
  author?: NpmAuthor;
  bugs?: NpmBugs;
  contributors: NpmContributors[];
  description: string;
  'dist-tags': NpmTags;
  homepage?: string;
  keywords: string[];
  license: string;
  maintainers: NpmMaintainer[];
  name: string;
  readme: string;
  readmeFilename: string;
  repository: NpmRepository;
  time: NpmTime;
  users: NpmUsers;
  versions: NpmVersions;
  _id: string;
  _rev: string;
}

export interface NpmSearchResult {
  description: string[];
  name: string[];
  version: string[];
}

export interface NpmSearchResults {
  from: number;
  results: NpmSearchResult[];
  total: number;
}
