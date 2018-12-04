import { SearchableType, Searcher } from "./searcher";

export class DomainWatch implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["domain", "email"];

  constructor() {
    this.endpoint = "https://domainwat.ch";
    this.name = "DomainWatch";
  }

  searchByDomain(query) {
    return `${this.endpoint}/whois/${query}`;
  }

  searchByEmail(query) {
    return `${this.endpoint}/search?query=${encodeURIComponent(query)}`;
  }
}
