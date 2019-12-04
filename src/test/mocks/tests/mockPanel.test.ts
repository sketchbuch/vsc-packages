import { expect } from 'chai';
import { mockPanel } from '..';

suite('mockPanel()', () => {
  test('Has correct shape', () => {
    expect(mockPanel).to.be.an('object');
    expect(mockPanel).to.have.eql({});
  });
});
