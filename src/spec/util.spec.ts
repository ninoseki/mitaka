import { expect } from 'chai';
import 'mocha';
import { normalize } from '../util';

describe('normalize', () => {
  it('should remove square bracket(s)', () => {
    const r1 = normalize('1.1.1[.]1');
    expect(r1).to.equal('1.1.1.1');

    const r2 = normalize('example[.]com');
    expect(r2).to.equal('example.com');

    const r3 = normalize('125[.]227[.]143[.]137');
    expect(r3).to.equal('125.227.143.137');

    const r4 = normalize('hoge[.]co[.]jp/hoge/hoge');
    expect(r4).to.equal('hoge.co.jp/hoge/hoge');
  });

  it('should remove / which located in end of string', () => {
    const r1 = normalize('https://hoge.com');
    expect(r1).to.equal('hoge.com');

    const r2 = normalize('https://hoge.com/');
    expect(r2).to.equal('hoge.com');

  });
});
