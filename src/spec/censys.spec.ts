import { expect } from 'chai';
import 'mocha';
import { Censys } from '../censys';

describe('Censys', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const censys = new Censys('urlscan.io');
      expect(censys.searchUrl()).to.equal('https://censys.io/ipv4?q=urlscan.io');
    });
  });
});
