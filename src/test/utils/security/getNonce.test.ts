import getNonce from '../../../utils/security/getNonce';
import { expect } from 'chai';

suite('getNonce()', () => {
  test('Returns nonce', () => {
    expect(getNonce()).not.be.empty;
    expect(getNonce()).to.have.length(32);
  });
});
