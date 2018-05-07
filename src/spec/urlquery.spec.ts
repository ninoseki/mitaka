import { expect } from 'chai';
import 'mocha';
import { Urlquery } from '../lib/urlquery';

describe('Urlquery', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const urlquery = new Urlquery();
      expect(urlquery.searchUrl('urlscan.io')).to.equal('https://urlquery.net/search?q=urlscan.io');
      expect(urlquery.searchUrl(' href=https://urlscan.io ')).to.
        equal('https://urlquery.net/search?q=%20href%3Dhttps%3A%2F%2Furlscan.io%20');
    });
  });
});
