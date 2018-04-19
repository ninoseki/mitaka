import axios from 'axios';
import * as validator from 'validator';
import { defaultIsURLOptions } from './util';

export class Urlscan {

  protected apiKey: string;
  protected endpoint: string;

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://urlscan.io/api/v1';
  }

  public search_url(query) {
    const url = `https://urlscan.io/search/`;
    if (validator.isURL(query, defaultIsURLOptions)) {
      const encoded = encodeURIComponent(`"${query}"`);
      return `${url}#${encoded}`;
    }
    const encoded = encodeURIComponent(query);
    return `${url}#${query}`;
  }

  public async submit(url, isPublic = true) {
    const res = await axios.post(`${this.endpoint}/scan/`, {
      public: isPublic ? 'on' : 'off',
      url,
    }, {
        headers: {
          'API-KEY': this.apiKey,
        },
      });
    return res;
  }
}
