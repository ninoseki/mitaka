import { expect } from 'chai';
import 'mocha';
import { PublicWWW } from '../publicwww';

describe('PublicWWW', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      let publicwww = new PublicWWW('urlscan.io');
      expect(publicwww.searchUrl()).to.equal('https://publicwww.com/websites/urlscan.io');

      publicwww = new PublicWWW(' href=https://urlscan.io ');
      expect(publicwww.searchUrl()).to.equal('https://publicwww.com/websites/%20href%3Dhttps%3A%2F%2Furlscan.io%20');
    });
  });
});
