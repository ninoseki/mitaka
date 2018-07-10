import { Searcher } from './searcher';

export class SecurityTrails implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ['domain', 'ip'];

  constructor() {
    this.endpoint = 'https://securitytrails.com';
    this.name = 'SecurityTrails';
  }

  public searchByRaw(raw) {
    const encoded = encodeURIComponent(raw);
    return `${this.endpoint}/list/keyword/${encoded}`;
  }

  public searchByIP(ip) {
    return `${this.endpoint}/list/ip/${ip}`;
  }

  public searchByDomain(domain) {
    return `${this.endpoint}/domain/${domain}`;
  }
}
