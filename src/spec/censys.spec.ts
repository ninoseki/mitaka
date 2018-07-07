import { expect } from 'chai';
import 'mocha';
import { Censys } from '../lib/censys';

describe('Censys', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const censys = new Censys();
      expect(censys.searchByRaw('urlscan.io')).to.equal('https://censys.io/ipv4?q=urlscan.io');
    });
  });
});
