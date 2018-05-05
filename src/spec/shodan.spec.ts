import { expect } from 'chai';
import 'mocha';
import { Shodan } from '../shodan';

describe('Shodan', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const shodan = new Shodan('urlscan.io');
      expect(shodan.searchUrl()).to.equal('https://www.shodan.io/search?query=urlscan.io');
    });
  });
});
