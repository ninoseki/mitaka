import * as crypto from 'crypto-js';
import * as url from 'url';
import * as validator from 'validator';
import { defaultIsURLOptions } from './util';

export class VirusTotal {

  protected query: string;
  protected endpoint: string;

  constructor(query) {
    this.query = query;
    this.endpoint = 'https://www.virustotal.com/#';
  }

  public searchUrl() {
    if (validator.isIP(this.query)) {
      return this.ip_addr();
    } else if (validator.isURL(this.query, defaultIsURLOptions)) {
      return this.url();
    } else if (validator.isFQDN(this.query)) {
      return this.domain();
    }
    return this.hash();
  }

  private ip_addr() {
    return `${this.endpoint}/ip-address/${this.query}`;
  }

  private url() {
    const hash = crypto.SHA256(this.normalize_url());
    return `${this.endpoint}/url/${hash}`;
  }

  private normalize_url() {
    const parsedUrl = url.parse(this.query);
    if (parsedUrl.pathname === '/' && this.query.slice(-1) !== '/') {
      return `${this.query}/`;
    }
    return this.query;
  }

  private domain() {
    return `${this.endpoint}/domain/${this.query}`;
  }

  private hash() {
    return `${this.endpoint}/file/${this.query}`;
  }
}
