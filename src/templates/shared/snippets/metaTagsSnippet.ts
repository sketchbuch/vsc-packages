export const metaTagsSnippet = (nonce: string): string => {
  return `
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" 
      content="default-src 'self' vscode-resource: 'nonce-${nonce}';
      img-src 'self' vscode-resource: data: 'nonce-${nonce}';
      script-src 'self' vscode-resource: 'nonce-${nonce}';
      style-src 'self' vscode-resource: 'nonce-${nonce}'";
    >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  `;
};
