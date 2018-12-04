import { SearchableType, Searcher } from "./searcher";

export class SecurityTrails implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://securitytrails.com";
    this.name = "SecurityTrails";
  }

  searchByText(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/list/keyword/${encoded}`;
  }

  searchByIP(ip) {
    return `${this.endpoint}/list/ip/${ip}`;
  }

  searchByDomain(domain) {
    return `${this.endpoint}/domain/${domain}`;
  }
}
