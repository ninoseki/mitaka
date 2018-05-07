import axios from 'axios';
import * as validator from 'validator';
import { Searcher } from './searcher';
import { defaultIsURLOptions } from './util';

export class Urlscan extends Searcher {

  protected apiKey: string;
  protected endpoint: string;

  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    this.endpoint = 'https://urlscan.io/api/v1';
  }

  public searchUrl(query) {
    const url = `https://urlscan.io/search/`;
    let encoded = encodeURIComponent(query);
    if (validator.isURL(query, defaultIsURLOptions)) {
      encoded = encodeURIComponent(`"${query}"`);
    }
    return `${url}#${encoded}`;
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
