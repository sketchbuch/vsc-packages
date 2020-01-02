import { TabboxItem, TabboxItems } from '../../../types';

const tabboxSnippet = (items: TabboxItems): string => {
  const selectedItem = items.find((item: TabboxItem) => item.button.selected) || items[0];

  return `
    <div class="tabbox">
      <ul class="tabbox__buttons">
        ${items
          .map((item: TabboxItem): string => {
            const { button, id } = item;
            const selectedAttr = selectedItem.id === id ? 'data-selected="true" ' : '';

            return `
            <li class="tabbox__button">
              <a id="tabbtn-${id}" ${selectedAttr}href="#" title="${button.label}">
                ${button.label}
              </a>
            </li>`;
          })
          .join('')}
      </ul>
      <div class="tabbox__content">
        <div class="tabbox__content-box">
          ${selectedItem.content()}
        </div>
      </div>
    </div>`;
};

export default tabboxSnippet;
