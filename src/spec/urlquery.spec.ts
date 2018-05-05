import { expect } from 'chai';
import 'mocha';
import { Urlquery } from '../urlquery';

describe('Urlquery', () => {
  describe('#searchUrl', () => {
    it('should return URL', () => {
      let urlquery = new Urlquery('urlscan.io');
      expect(urlquery.searchUrl()).to.equal('https://urlquery.net/search?q=urlscan.io');

      urlquery = new Urlquery(' href=https://urlscan.io ');
      expect(urlquery.searchUrl()).to.equal('https://urlquery.net/search?q=%20href%3Dhttps%3A%2F%2Furlscan.io%20');
    });
  });
});
