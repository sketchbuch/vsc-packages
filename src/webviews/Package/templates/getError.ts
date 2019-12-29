import { EXT } from '../../../constants';

const getError = (error: Error) => {
  return `
    <div class="${EXT}__error">
      <p class="${EXT}__error-msg">An error occured</p>
      <p class="${EXT}__error-msg-sub">${error.message}</p>
    </div>`;
};

export default getError;
