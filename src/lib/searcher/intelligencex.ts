import { SearchableType, Searcher } from "./searcher";

export class IntelligenceX implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "url", "email", "btc"];

  constructor() {
    this.endpoint = "https://intelx.io";
    this.name = "IntelligenceX";
  }

  searchByIP(query) {
    return this.search(query);
  }

  searchByDomain(query) {
    return this.search(query);
  }

  searchByURL(query) {
    return this.search(query);
  }

  searchByEmail(query) {
    return this.search(query);
  }

  searchByBTC(query) {
    return this.search(query);
  }

  private search(query) {
    return `${this.endpoint}/?s=${query}`;
  }
}
