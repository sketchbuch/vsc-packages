import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { FS_UTF8, FS_PACKAGEJSON } from '../../../constants';

suite('Mock package.json', () => {
  test('Structure is as expected', () => {
    const filepath = path.join(`${__dirname}/../../../../src/test/mocks/`, FS_PACKAGEJSON);
    const packageJson = fs.readFileSync(filepath, FS_UTF8);

    expect(JSON.parse(packageJson)).to.be.eql({
      test: true,
      dependencies: {
        react: '1.0.1',
      },
      devDependencies: {
        'react-dom': '1.0.1',
      },
    });
  });
});
