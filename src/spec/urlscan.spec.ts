import { expect } from 'chai';
import 'mocha';
import { Urlscan } from '../lib/urlscan';

describe('Urlscan', () => {
  describe('#submit', () => {
    it('should return JSON', async () => {
      const urlscan = new Urlscan('invalid_api_key');
      let message;
      const res = await urlscan.submit('example.com').catch((e) => {
        if (e.response.status === 401) {
          message = 'Please set your API key via the option';
        } else {
          message = e.response.data.description;
        }
      });
      expect(message).to.eq('Please set your API key via the option');
    });
  });
  describe('#searchUrl', () => {
    it('should return URL', () => {
      const urlscan = new Urlscan('dummy');

      expect(urlscan.searchUrl('https://urlscan.io')).to.
        eq('https://urlscan.io/search/#%22https%3A%2F%2Furlscan.io%22');
      expect(urlscan.searchUrl('urlscan.io')).to.eq('https://urlscan.io/search/#urlscan.io');
      expect(urlscan.searchUrl('1.1.1.1')).to.eq('https://urlscan.io/search/#1.1.1.1');
    });
  });
});
