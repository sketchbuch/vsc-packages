import { Cmd } from '../../types';
import { spy } from 'sinon';

const mockCmds: Cmd[] = [
  {
    cmd: 'TEST',
    callback: spy(),
  },
];

export default mockCmds;
