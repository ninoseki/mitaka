import { SearchableType, Searcher } from "./searcher";

export class DNSlytics implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://dnslytics.com";
    this.name = "DNSlytics";
  }

  public searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/domain/${query}`;
  }
}
