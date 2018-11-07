import { SearchableType, Searcher } from "./searcher";

export class SecurityTrails implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip"];

  constructor() {
    this.endpoint = "https://securitytrails.com";
    this.name = "SecurityTrails";
  }

  public searchByText(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/list/keyword/${encoded}`;
  }

  public searchByIP(ip) {
    return `${this.endpoint}/list/ip/${ip}`;
  }

  public searchByDomain(domain) {
    return `${this.endpoint}/domain/${domain}`;
  }
}
