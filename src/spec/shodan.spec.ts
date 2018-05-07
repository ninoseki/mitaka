import { expect } from 'chai';
import 'mocha';
import { Shodan } from '../lib/shodan';

describe('Shodan', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const shodan = new Shodan();
      expect(shodan.searchUrl('urlscan.io')).to.equal('https://www.shodan.io/search?query=urlscan.io');
    });
  });
});
