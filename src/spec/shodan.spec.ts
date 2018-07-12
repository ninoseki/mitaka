import { expect } from 'chai';
import 'mocha';
import { Shodan } from '../lib/shodan';

describe('Shodan', () => {
  describe('#searchByURL', () => {
    it('should return URL', () => {
      const shodan = new Shodan();
      expect(shodan.searchByText('urlscan.io')).to.equal('https://www.shodan.io/search?query=urlscan.io');
    });
  });
});
