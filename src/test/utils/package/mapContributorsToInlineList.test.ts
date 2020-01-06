import { expect } from 'chai';
import { mapContributorsToInlineList } from '../../../utils';
import { mockContributors, mockInlineListItems } from '../../mocks';

suite('mapContributorsToInlineList()', () => {
  test('Returns expected number of items', () => {
    expect(mapContributorsToInlineList(mockContributors)).to.have.length(4);
  });

  test('Returns expected result', () => {
    expect(mapContributorsToInlineList(mockContributors)).to.eql(mockInlineListItems);
  });
});
