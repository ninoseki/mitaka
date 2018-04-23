import { expect } from 'chai';
import 'mocha';
import { PublicWWW } from '../publicwww';

describe('PublicWWW', () => {
  describe('#search_url', () => {
    it('should return URL', () => {
      let publicwww = new PublicWWW('urlscan.io');
      expect(publicwww.search_url()).to.equal('https://publicwww.com/websites/urlscan.io');

      publicwww = new PublicWWW(' href=https://urlscan.io ');
      expect(publicwww.search_url()).to.equal('https://publicwww.com/websites/%20href%3Dhttps%3A%2F%2Furlscan.io%20');
    });
  });
});
