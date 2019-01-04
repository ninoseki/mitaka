import { SearchableType, Searcher } from "./searcher";

export class DomainWatch implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "email"];

  constructor() {
    this.endpoint = "https://domainwat.ch";
    this.name = "DomainWatch";
  }

  public searchByDomain(query) {
    return `${this.endpoint}/whois/${query}`;
  }

  public searchByEmail(query) {
    return `${this.endpoint}/search?query=${encodeURIComponent(query)}`;
  }
}
