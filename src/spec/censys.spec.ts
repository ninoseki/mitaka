import { expect } from 'chai';
import 'mocha';
import { Censys } from '../censys';

describe('Censy', () => {
  describe('#search_url', () => {
    it('should return URL', () => {
      const censys = new Censys('urlscan.io');
      expect(censys.search_url()).to.equal('https://censys.io/ipv4?q=urlscan.io');
    });
  });
});
