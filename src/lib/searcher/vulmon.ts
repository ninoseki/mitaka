import { SearchableType, Searcher } from "./searcher";

export class Vulmon implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["cve"];

  constructor() {
    this.endpoint = "https://vulmon.com";
    this.name = "Vulmon";
  }

  public searchByCVE(query) {
    return `${this.endpoint}/vulnerabilitydetails?qid=${query}`;
  }
}
