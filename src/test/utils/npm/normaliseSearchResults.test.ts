import { expect } from 'chai';
import { normaliseSearchResults } from '../../../utils';

suite('normaliseSearchResults()', () => {
  const mockSearchResults = {
    from: 0,
    results: [
      {
        description: ['The best framework you can use'],
        name: ['react'],
        version: ['16.0.0'],
      },
      {
        description: ['A description'],
        name: ['react-dom'],
        version: ['16.0.0'],
      },
    ],
    total: 1200,
  };

  test('Normalises resulst correctly', () => {
    const result = normaliseSearchResults(mockSearchResults);
    const expected = {
      from: 0,
      results: [
        {
          description: 'The best framework you can use',
          name: 'react',
          version: '16.0.0',
        },
        {
          description: 'A description',
          name: 'react-dom',
          version: '16.0.0',
        },
      ],
      total: 1200,
    };
    expect(result).to.eql(expected);
  });
});
