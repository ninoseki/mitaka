import * as validator from 'validator';
import { Searcher } from './searcher';

export class SecurityTrails extends Searcher {

  protected endpoint: string;

  constructor() {
    super();
    this.endpoint = 'https://securitytrails.com';
  }

  public searchUrl(query) {
    if (validator.isIP(query)) {
      return this.ip_addr(query);
    } else if (validator.isFQDN(query)) {
      return this.domain(query);
    }
    return this.keyword(query);
  }

  private ip_addr(query) {
    return `${this.endpoint}/list/ip/${query}`;
  }

  private domain(query) {
    return `${this.endpoint}/domain/${query}`;
  }

  private keyword(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/list/keyword/${encoded}`;
  }
}
