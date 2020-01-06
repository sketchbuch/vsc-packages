import { expect } from 'chai';
import { columnsSnippet } from '../../../../webviews/Package/snippets';

suite('columnsSnippet()', () => {
  const testContentLeft = '<div class="test-content-left"></div>';
  const testContentRight = '<div class="test-content-right"></div>';
  const left = () => '';
  const right = () => '';
  const left2 = () => testContentLeft;
  const right2 = () => testContentRight;

  test('Returns a string', () => {
    expect(columnsSnippet(left, right)).to.be.a('string');
  });

  test('Renders a columns div', () => {
    expect(columnsSnippet(left, right)).to.contain('<div class="columns">');
  });

  test('Renders no column divs if both content functions render empty', () => {
    const result = columnsSnippet(left, right);

    expect(result).not.to.contain('<div class="column column--left">');
    expect(result).not.to.contain('<div class="column column--right">');
  });

  test('Renders correct numbers of column tags', () => {
    const result1 = columnsSnippet(left2, right2);
    expect(result1).to.contain('<div class="column column--left">');
    expect(result1).to.contain('<div class="column column--right">');

    const result2 = columnsSnippet(left, right2);
    expect(result2).not.to.contain('<div class="column column--left">');
    expect(result2).to.contain('<div class="column column--right">');

    const result3 = columnsSnippet(left2, right);
    expect(result3).to.contain('<div class="column column--left">');
    expect(result3).not.to.contain('<div class="column column--right">');
  });

  test('Renders content correctly', () => {
    const result = columnsSnippet(left2, right2);

    expect(result).to.contain(testContentLeft);
    expect(result).to.contain(testContentRight);
  });
});
