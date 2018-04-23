import { expect } from 'chai';
import 'mocha';
import { Urlscan } from '../urlscan';

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
  describe('#search_url', () => {
    it('should return URL', () => {
      const urlscan = new Urlscan('dummy');

      const r1 = urlscan.search_url('https://urlscan.io');
      expect(r1).to.eq('https://urlscan.io/search/#%22https%3A%2F%2Furlscan.io%22')

      const r2 = urlscan.search_url('urlscan.io');
      expect(r2).to.eq('https://urlscan.io/search/#urlscan.io');

      const r3 = urlscan.search_url('1.1.1.1');
      expect(r3).to.eq('https://urlscan.io/search/#1.1.1.1');
    });
  });
});
