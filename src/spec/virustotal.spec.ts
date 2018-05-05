import { expect } from 'chai';
import 'mocha';
import { VirusTotal } from '../virustotal';

describe('VirusTotal', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      let vt = new VirusTotal('https://virustotal.com');
      const e1 = 'https://www.virustotal.com/#/url/77af0145fa9290ca3a4c214eb4561fc01070132300f6265e2c4cfb447372422e';
      expect(vt.searchUrl()).to.equal(e1);
      vt = new VirusTotal('https://qiita.com/trend');
      const e2 = 'https://www.virustotal.com/#/url/5dd2d006b4430a593be125eee20494016d3ac933796da6deef590c3e045a685d';
      expect(vt.searchUrl()).to.equal(e2);

      vt = new VirusTotal('1.1.1.1');
      expect(vt.searchUrl()).to.equal('https://www.virustotal.com/#/ip-address/1.1.1.1');

      vt = new VirusTotal('virustotal.com');
      expect(vt.searchUrl()).to.equal('https://www.virustotal.com/#/domain/virustotal.com');

      vt = new VirusTotal('275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f');
      const e3 = 'https://www.virustotal.com/#/file/275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f';
      expect(vt.searchUrl()).to.equal(e3);
    });
  });
});
