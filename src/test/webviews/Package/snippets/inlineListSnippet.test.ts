import { expect } from 'chai';
import { inlineListSnippet } from '../../../../webviews/Package/snippets';
import { mockInlineListContributors } from '../../../mocks';

suite('inlineListSnippet()', () => {
  test('Returns an empty string if no items', () => {
    expect(inlineListSnippet([])).to.equal('');
  });

  suite('Title:', () => {
    const title = 'A title';

    test('Renders the title if provided', () => {
      expect(inlineListSnippet([...mockInlineListContributors], title)).to.contain(title);
    });

    test('Does not render a title if not provided', () => {
      expect(inlineListSnippet([...mockInlineListContributors])).not.to.contain(title);
    });

    test('Renders correct number of items', () => {
      const listItems = inlineListSnippet([...mockInlineListContributors]).match(
        /inline-list__item/g
      );
      expect(listItems?.length).to.equal(4);
    });

    test('Renders a <span> if no URL or email', () => {
      const items = mockInlineListContributors.slice(0, 1);
      const result = inlineListSnippet(items);
      expect(result).to.contain('<span class="inline-list__element">');
      expect(result).not.to.contain(`<a class="inline-list__element"`);
    });

    test('Renders an <a> with a URL link', () => {
      const items = mockInlineListContributors.slice(2, 3);
      const result = inlineListSnippet(items);
      expect(result).not.to.contain('<span class="inline-list__element">');
      expect(result).to.contain(`<a class="inline-list__element" href="${items[0].url}"`);
    });

    test('Renders an <a> email link', () => {
      const items = mockInlineListContributors.slice(1, 2);
      const result = inlineListSnippet(items);
      expect(result).not.to.contain('<span class="inline-list__element">');
      expect(result).to.contain(`<a class="inline-list__element" href="mailto:${items[0].email}"`);
    });
  });
});
