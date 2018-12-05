import { SearchableType, Searcher } from "./searcher";

export class RiskIQ implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  constructor() {
    this.endpoint = "https://community.riskiq.com";
    this.name = "RiskIQ";
  }

  public searchByIP(query) {
    return `${this.endpoint}/search/${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/search/${query}`;
  }

  public searchByEmail(query) {
    return `${this.endpoint}/search/whois/email/${query}`;
  }
}
