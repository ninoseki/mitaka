import { SearchableType, Searcher } from "./searcher";

export class Cymon implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://cymon.io";
    this.name = "Cymon";
  }

  public searchByIP(query) {
    return `${this.endpoint}/${query}`;
  }

  public searchByDomain(query) {
    return `${this.endpoint}/domain/${query}`;
  }
}
