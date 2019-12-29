import { EXT } from '../../../constants';

const getLoading = () => {
  return `
    <div class="${EXT}__loader">
      <div class="${EXT}__loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>`;
};

export default getLoading;
