import { Searcher } from "./searcher";

export class FindSubDomains implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["domain"];

  constructor() {
    this.endpoint = "https://findsubdomains.com";
    this.name = "FindSubDomains";
  }

  public searchByDomain(query) {
    return `${this.endpoint}/subdomains-of/${query}`;
  }
}
