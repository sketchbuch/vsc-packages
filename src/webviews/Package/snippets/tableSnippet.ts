const tableHeaders = (headers: string[]): string => {
  return `
    <thead>
      <tr>
        ${headers.map((label: string) => `<th>${label}</th>`).join('')}
      </tr>
    </thead>
  `;
};

const tableSnippet = (headers: string[]): string => {
  return `
    <table>
      ${headers.length > 0 ? tableHeaders(headers) : ''}
    </table>
  `;
};

export default tableSnippet;
