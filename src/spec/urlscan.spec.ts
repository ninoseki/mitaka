import { expect } from 'chai';
import 'mocha';
import { Urlscan } from '../lib/urlscan';

describe('Urlscan', () => {
  describe('#submit', () => {
    it('should return JSON', async () => {
      const scanner = new Urlscan('invalid_api_key');
      let message = '';
      const res = await scanner.scanByUrl('example.com').catch((e) => {
        if (e.response.status === 401) {
          message = 'Please set your API key via the option';
        } else {
          message = e.response.data.description;
        }
      });
      expect(message).to.eq('Please set your API key via the option');
    });
  });

  const urlscan = new Urlscan('dummy');
  describe('#searchByURL', () => {
    it('should return URL', () => {
      expect(urlscan.searchByURL('https://urlscan.io')).to.
        eq('https://urlscan.io/search/#%22https%3A%2F%2Furlscan.io%22');
      expect(urlscan.searchByDomain('urlscan.io')).to.eq('https://urlscan.io/search/#urlscan.io');
      expect(urlscan.searchByIP('1.1.1.1')).to.eq('https://urlscan.io/search/#1.1.1.1');
    });
  });
  describe('#searchByIP', () => {
    it('should return URL', () => {
      expect(urlscan.searchByIP('1.1.1.1')).to.eq('https://urlscan.io/search/#1.1.1.1');
    });
  });
  describe('#searchByDomain', () => {
    it('should return URL', () => {
      expect(urlscan.searchByDomain('urlscan.io')).to.eq('https://urlscan.io/search/#urlscan.io');
    });
  });
});
