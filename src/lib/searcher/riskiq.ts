import { SearchableType, Searcher } from "./searcher";

export class RiskIQ implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  constructor() {
    this.endpoint = "https://community.riskiq.com";
    this.name = "RiskIQ";
  }

  searchByIP(query) {
    return `${this.endpoint}/search/${query}`;
  }

  searchByDomain(query) {
    return `${this.endpoint}/search/${query}`;
  }

  searchByEmail(query) {
    return `${this.endpoint}/search/whois/email/${query}`;
  }
}
