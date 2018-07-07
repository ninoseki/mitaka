import { expect } from 'chai';
import 'mocha';
import { PublicWWW } from '../lib/publicwww';

describe('PublicWWW', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const publicwww = new PublicWWW();
      expect(publicwww.searchByRaw('urlscan.io')).to.equal('https://publicwww.com/websites/urlscan.io');

      expect(publicwww.searchByRaw(' href=https://urlscan.io ')).to.
        equal('https://publicwww.com/websites/%20href%3Dhttps%3A%2F%2Furlscan.io%20');
    });
  });
});
