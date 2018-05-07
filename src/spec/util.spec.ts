import { expect } from 'chai';
import 'mocha';
import { removeSquareBrackets } from '../lib/util';

describe('removeSquareBrackets', () => {
  it('should remove square bracket(s)', () => {
    expect(removeSquareBrackets('1.1.1[.]1')).to.equal('1.1.1.1');
    expect(removeSquareBrackets('example[.]com')).to.equal('example.com');
    expect(removeSquareBrackets('125[.]227[.]143[.]137')).to.equal('125.227.143.137');
    expect(removeSquareBrackets('hoge[.]co[.]jp/hoge/hoge')).to.equal('hoge.co.jp/hoge/hoge');
  });
});
