import { expect } from 'chai';
import 'mocha';
import { VirusTotal } from '../lib/virustotal';

describe('VirusTotal', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const vt = new VirusTotal();

      expect(vt.searchByURL('https://virustotal.com')).to.
        equal('https://www.virustotal.com/#/url/77af0145fa9290ca3a4c214eb4561fc01070132300f6265e2c4cfb447372422e');
      expect(vt.searchByURL('https://qiita.com/trend')).to.
        equal('https://www.virustotal.com/#/url/5dd2d006b4430a593be125eee20494016d3ac933796da6deef590c3e045a685d');
      expect(vt.searchByIP('1.1.1.1')).to.equal('https://www.virustotal.com/#/ip-address/1.1.1.1');
      expect(vt.searchByDomain('virustotal.com')).to.equal('https://www.virustotal.com/#/domain/virustotal.com');
      expect(vt.searchByHash('275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f')).to.
        equal('https://www.virustotal.com/#/file/275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f');
    });
  });
});
