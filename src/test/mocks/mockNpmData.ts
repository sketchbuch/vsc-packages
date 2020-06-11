import { NpmPackageData } from '../../types';

const mockNpmData: NpmPackageData = {
  _id: 'vscode',
  _rev: '182-3e3c0da50e550e03f1a54f67ade23cae',
  author: {
    name: 'Visual Studio Code Team',
  },
  bugs: {
    url: 'https://github.com/Microsoft/vscode-extension-vscode/issues',
  },
  contributors: [],
  description: '## ⚠️ Use @types/vscode and vscode-test instead ⚠️',
  'dist-tags': {
    latest: '1.1.36',
  },
  homepage: 'https://github.com/Microsoft/vscode-extension-vscode#readme',
  keywords: [],
  license: 'MIT',
  maintainers: [
    {
      email: 'alexdima@microsoft.com',
      name: 'alexandrudima',
    },
  ],
  name: 'vscode',
  readme:
    '# vscode-extension-vscode\n\n## ⚠️ Use @types/vscode and vscode-test instead ⚠️\n\nThe funcionality of `vscode` module has been splitted into `@types/vscode` and `vscode-test`. They have fewer dependencies, allow greater flexibility in writing tests and will continue to receive updates. Although `vscode` will continue to work, we suggest that you migrate to `@types/vscode` and `vscode-test`.\n\n[Release Notes](https://code.visualstudio.com/updates/v1_36#_splitting-vscode-package-into-typesvscode-and-vscodetest) | [Migration Guide](https://code.visualstudio.com/api/working-with-extensions/testing-extension#migrating-from-vscode)\n\n---\n\nThe `vscode` NPM module provides VS Code extension authors tools to write extensions. It provides the `vscode.d.ts` node module (all accessible API for extensions) as well as commands for compiling and testing extensions.\n\nFor more information around extension authoring for VS Code, please see http://code.visualstudio.com/docs/extensions/overview\n\n# License\n\n[MIT](LICENSE)\n',
  readmeFilename: 'README.md',
  repository: {
    type: 'git',
    url: 'git+https://github.com/Microsoft/vscode-extension-vscode.git',
  },
  time: {
    '0.8.0': '2015-09-23T08:30:35.797Z',
    created: '2015-09-23T08:30:35.797Z',
    modified: '2019-07-31T23:45:52.995Z',
  },
  users: {
    ctaggart: true,
    huiyifyj: true,
    kexi: true,
    shakakira: true,
  },
  versions: {
    '0.8.0': {
      _from: '.',
      _id: 'vscode@0.8.0',
      _nodeVersion: '0.12.7',
      _npmUser: {
        email: 'benjpas@microsoft.com',
        name: 'bpasero',
      },
      _npmVersion: '2.11.3',
      _shasum: '08752aa8c948d18869f44d17068cd69c1393349f',
      deprecated: 'Please update to version 0.11.x for improved typings and test support',
      directories: {},
      dist: {
        shasum: '08752aa8c948d18869f44d17068cd69c1393349f',
        tarball: 'https://registry.npmjs.org/vscode/-/vscode-0.8.0.tgz',
      },
      maintainers: [
        {
          email: 'benjpas@microsoft.com',
          name: 'bpasero',
        },
      ],
      name: 'vscode',
      scripts: {},
      version: '0.8.0',
    },
  },
};

export default JSON.parse(JSON.stringify(mockNpmData));
