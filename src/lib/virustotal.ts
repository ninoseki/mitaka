
import * as crypto from 'crypto-js';
import * as url from 'url';
import * as validator from 'validator';
import { Searcher } from './searcher';
import { defaultIsURLOptions } from './util';

export class VirusTotal extends Searcher {

  protected endpoint: string;

  constructor() {
    super();
    this.endpoint = 'https://www.virustotal.com/#';
  }

  public searchUrl(query) {
    if (validator.isIP(query)) {
      return this.ip_addr(query);
    } else if (validator.isURL(query, defaultIsURLOptions)) {
      return this.url(query);
    } else if (validator.isFQDN(query)) {
      return this.domain(query);
    }
    return this.hash(query);
  }

  private ip_addr(query) {
    return `${this.endpoint}/ip-address/${query}`;
  }

  private url(query) {
    const hash = crypto.SHA256(this.normalize_url(query));
    return `${this.endpoint}/url/${hash}`;
  }

  private normalize_url(query) {
    const parsedUrl = url.parse(query);
    if (parsedUrl.pathname === '/' && query.slice(-1) !== '/') {
      return `${query}/`;
    }
    return query;
  }

  private domain(query) {
    return `${this.endpoint}/domain/${query}`;
  }

  private hash(query) {
    return `${this.endpoint}/file/${query}`;
  }
}
