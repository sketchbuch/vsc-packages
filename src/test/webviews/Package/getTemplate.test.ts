import * as vscode from 'vscode';
import { expect } from 'chai';
import getTemplate from '../../../webviews/Package/getTemplate';
import { GetTemplate } from '../../../types';
import { packageName } from '../../mocks';
import { EXT } from '../../../constants';

suite('Package getTemplate()', () => {
  const props: GetTemplate = {
    cssUri: {} as vscode.Uri,
    packageName,
    nonce: '3w342erf32',
    scriptUri: {} as vscode.Uri,
  };
  const result = getTemplate(props);

  test('Returns a string', () => {
    expect(result).to.be.a('string');
  });

  test('Contains a <DOCTYPE> tag', () => {
    expect(result).contains('<!DOCTYPE html>');
  });

  test('Contains a <html> tag', () => {
    expect(result).contains('<html');
    expect(result).contains('</html>');
  });

  test('Contains a <head> tag', () => {
    expect(result).contains('<head');
    expect(result).contains('</head>');
  });

  test('Contains a <body> tag', () => {
    expect(result).contains('<body');
    expect(result).contains('</body>');
  });

  suite('<head>', () => {
    test('Contains a <title> tag', () => {
      expect(result).contains('<title');
      expect(result).contains('</title>');
    });

    test('Contains a Content-Security-Policy meta tag', () => {
      expect(result).contains(
        `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${props.nonce}';">`
      );
    });

    test('Contains other expected meta tags', () => {
      expect(result).contains('<meta charset="UTF-8">');
      expect(result).contains(
        'meta name="viewport" content="width=device-width, initial-scale=1.0">'
      );
    });
  });

  suite('<body>', () => {
    test('Contains an <h1> tag', () => {
      expect(result).contains(`<h1 id="${EXT}__name"`);
      expect(result).contains('</h1>');
    });

    test('Contains a <script> tag with nonce set', () => {
      expect(result).contains('<script nonce');
      expect(result).contains('</script>');
    });
  });
});
