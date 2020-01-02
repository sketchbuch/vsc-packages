const columnsSnippet = (left: () => void, right: () => void): string => {
  return `
    <div class="columns">
      <div class="column">
        ${left()}
      </div>
      <div class="column">
        ${right()}
      </div>
    </div>
  `;
};

export default columnsSnippet;
