import { SearchableType, Searcher } from "./searcher";

export class FindSubDomains implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["domain"];

  constructor() {
    this.endpoint = "https://findsubdomains.com";
    this.name = "FindSubDomains";
  }

  searchByDomain(query) {
    return `${this.endpoint}/subdomains-of/${query}`;
  }
}
