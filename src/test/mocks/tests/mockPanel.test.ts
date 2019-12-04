import { expect } from 'chai';
import { mockPanel } from '..';

suite('mockPanel()', () => {
  test('Has correct shape', () => {
    const { dispose, onDidChangeViewState, onDidDispose, reveal, webview, ...rest } = mockPanel;
    const { asWebviewUri } = webview;
    expect(mockPanel).to.be.an('object');
    expect(rest).to.have.eql({
      active: true,
      options: {},
      title: 'A Title',
      viewType: 'test-view-type',
      visible: true,
    });
    expect(dispose).to.be.a('function');
    expect(onDidChangeViewState).to.be.a('function');
    expect(onDidDispose).to.be.a('function');
    expect(reveal).to.be.a('function');
    expect(webview).to.be.an('object');
    expect(asWebviewUri).to.be.a('function');
  });
});
