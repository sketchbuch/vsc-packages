export const licenseSnippet = (license: string): string => {
  if (license) {
    return `<li class="data__licence" title="Licence">${license}</li>`;
  }

  return '';
};
