import { expect } from 'chai';
import 'mocha';
import { removeSquareBrackets } from '../util';

describe('removeSquareBrackets', () => {
  it('should remove square bracket(s)', () => {
    const r1 = removeSquareBrackets('1.1.1[.]1');
    expect(r1).to.equal('1.1.1.1');

    const r2 = removeSquareBrackets('example[.]com');
    expect(r2).to.equal('example.com');

    const r3 = removeSquareBrackets('125[.]227[.]143[.]137');
    expect(r3).to.equal('125.227.143.137');

    const r4 = removeSquareBrackets('hoge[.]co[.]jp/hoge/hoge');
    expect(r4).to.equal('hoge.co.jp/hoge/hoge');
  });
});
