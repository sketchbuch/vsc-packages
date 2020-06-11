import { expect } from 'chai';
import { getNonce } from '../../../../utils/security/getNonce';

suite('getNonce()', () => {
  test('Returns nonce', () => {
    expect(getNonce()).not.be.empty;
    expect(getNonce()).to.have.length(32);
  });
});
