import getTemplate from '../../../../webviews/Package/templates/getTemplate';
import { expect } from 'chai';
import { GetTemplate } from '../../../../types';
import { packageName } from '../../../mocks';

suite('Package getTemplate()', () => {
  const props: GetTemplate = {
    cssPath: '',
    htmlData: {
      activeTab: 'readme',
      packageName,
      state: {
        data: undefined,
        error: undefined,
      },
    },
    nonce: '3w342erf32',
    scriptPath: '',
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

    test('Contains the correct Content-Security-Policy meta tag', () => {
      expect(result).contains('<meta http-equiv="Content-Security-Policy"');
      expect(result).contains(`content="default-src 'self' vscode-resource: 'nonce-${props.nonce}`);
      expect(result).contains(`img-src 'self' vscode-resource: data: 'nonce-${props.nonce}`);
      expect(result).contains(`script-src 'self' vscode-resource: 'nonce-${props.nonce}`);
      expect(result).contains(`style-src 'self' vscode-resource: 'nonce-${props.nonce}`);
    });

    test('Contains other expected meta tags', () => {
      expect(result).contains('<meta charset="UTF-8">');
      expect(result).contains(
        'meta name="viewport" content="width=device-width, initial-scale=1.0">'
      );
    });
  });

  suite('<body>', () => {
    test('Contains a <script> tag', () => {
      expect(result).contains(`<script nonce="${props.nonce}" `);
      expect(result).contains('</script>');
    });
  });
});
