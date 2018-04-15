import { expect } from 'chai';
import 'mocha';
import { Urlscan } from '../urlscan';

describe('Urlscan#submit', () => {
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
