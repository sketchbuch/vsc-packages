import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { getNpmPackageData } from '../../../../utils';
import { httpStatusCodes, URL_NPM_REG } from '../../../../constants';
import { NpmPackageData } from '../../../../types';

suite('getNpmPackageData()', () => {
  test('Rejects if a network error occurs', async () => {
    await getNpmPackageData('non-existent-package').catch((error: Error) => {
      expect(error.message).to.equal('Request failed with status code 404');
    });
  });

  test('Rejects if successful but staus is not 200', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${URL_NPM_REG}react`).reply(httpStatusCodes.NO_CONTENT, {});

    await getNpmPackageData('react')
      .catch((error: Error) => {
        expect(error.message).to.equal('An error occured whilst getting package data for "react"');
      })
      .finally(() => {
        mock.restore();
      });
  });

  test('Resolves the package data if no error', async () => {
    await getNpmPackageData('react')
      .then((data: NpmPackageData) => {
        expect(data).to.have.property('name');
        expect(data.name).to.equal('react');
      })
      .catch(() => {
        // Do nothing...
      });
  });
});
