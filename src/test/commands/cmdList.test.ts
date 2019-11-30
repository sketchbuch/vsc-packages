import { expect } from 'chai';
import { CMD_DISPLAY_PACKAGE, CMD_OPEN_NPM } from '../../constants';
import { Cmd } from '../../types';
import { cmdList } from '../../commands';

suite('commands: cmdList()', () => {
  test('Returns the correct number of commands', () => {
    expect(cmdList).to.have.length(2);
  });

  test('CMD_DISPLAY_PACKAGE exists', () => {
    expect(cmdList.find((cmd: Cmd) => cmd.cmd === CMD_DISPLAY_PACKAGE)).to.not.be.undefined;
  });

  test('CMD_OPEN_NPM exists', () => {
    expect(cmdList.find((cmd: Cmd) => cmd.cmd === CMD_OPEN_NPM)).to.not.be.undefined;
  });
});
