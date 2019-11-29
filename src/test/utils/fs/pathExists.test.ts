import * as fs from 'fs';
import * as sinon from 'sinon';
import { expect } from 'chai';
import pathExists from '../../../utils/fs/pathExists';

suite('utils/fs: pathExists()', () => {
  test('Calls fs.accessSync() once', () => {
    const spy = sinon.spy(fs, 'accessSync');
    pathExists('./nonexistent-file.txt');

    sinon.assert.calledOnce(spy);
    spy.restore();
  });

  test('Returns true if the file exists', () => {
    const result = pathExists(__dirname + '/pathExists.test.js');
    expect(result).to.be.true;
  });

  test('Returns false if the file does NOT exist', () => {
    const result = pathExists('./nonexistent-file.txt');
    expect(result).to.be.false;
  });
});
