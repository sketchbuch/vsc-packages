const columnsSnippet = (left: () => string, right: () => string): string => {
  const leftContent = left();
  const rightContent = right();

  return `
    <div class="columns">
      ${leftContent &&
        `<div class="column">
          ${leftContent}
        </div>`}
      ${rightContent &&
        `<div class="column">
          ${rightContent}
        </div>`}
    </div>
  `;
};

export default columnsSnippet;
