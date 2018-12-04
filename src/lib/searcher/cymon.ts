import { SearchableType, Searcher } from "./searcher";

export class Cymon implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://cymon.io";
    this.name = "Cymon";
  }

  searchByIP(query) {
    return `${this.endpoint}/${query}`;
  }

  searchByDomain(query) {
    return `${this.endpoint}/domain/${query}`;
  }
}
