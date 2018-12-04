import { SearchableType, Searcher } from "./searcher";

export class DNSlytics implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://dnslytics.com";
    this.name = "DNSlytics";
  }

  searchByIP(query) {
    return `${this.endpoint}/ip/${query}`;
  }

  searchByDomain(query) {
    return `${this.endpoint}/domain/${query}`;
  }
}
