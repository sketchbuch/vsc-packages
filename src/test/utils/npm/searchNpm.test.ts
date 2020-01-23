import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { httpStatusCodes, URL_NPM_SEARCH } from '../../../constants';
import { searchNpm } from '../../../utils';
import { SearchNormalisedResults } from '../../../types';

suite('searchNpm()', () => {
  test('Rejects if a network error occurs', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${URL_NPM_SEARCH}react`).reply(httpStatusCodes.NOT_FOUND, {});

    await searchNpm('react')
      .catch((error: Error) => {
        expect(error.message).to.equal('Request failed with status code 404');
      })
      .finally(() => {
        mock.restore();
      });
  });

  test('Rejects if successful but staus is not 200', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${URL_NPM_SEARCH}react`).reply(httpStatusCodes.NO_CONTENT, {});

    await searchNpm('react')
      .catch((error: Error) => {
        expect(error.message).to.equal('An error occured whilst trying to search NPM for "react"');
      })
      .finally(() => {
        mock.restore();
      });
  });

  test('Resolves the search data if no error', async () => {
    await searchNpm('react')
      .then((data: SearchNormalisedResults) => {
        expect(data).to.have.property('from');
        expect(data).to.have.property('results');
        expect(data).to.have.property('total');
      })
      .catch(() => {});
  });
});
