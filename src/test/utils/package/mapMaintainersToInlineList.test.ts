import { expect } from 'chai';
import { mapNpmObjToInlineList } from '../../../utils';
import { mockMaintainers, mockInlineListMaintainers } from '../../mocks';

suite('mapNpmObjToInlineList()', () => {
  test('Returns expected number of items', () => {
    expect(mapNpmObjToInlineList(mockMaintainers)).to.have.length(2);
  });

  test('Returns expected result', () => {
    expect(mapNpmObjToInlineList(mockMaintainers)).to.eql(mockInlineListMaintainers);
  });
});
