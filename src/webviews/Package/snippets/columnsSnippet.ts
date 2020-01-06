const columnsSnippet = (left: () => string, right: () => string): string => {
  const leftContent = left();
  const rightContent = right();

  return `
    <div class="columns">
      ${leftContent &&
        `<div class="column column--left">
          ${leftContent}
        </div>`}
      ${rightContent &&
        `<div class="column column--right">
          ${rightContent}
        </div>`}
    </div>
  `;
};

export default columnsSnippet;
