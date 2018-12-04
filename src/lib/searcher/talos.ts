import { SearchableType, Searcher } from "./searcher";

export class Talos implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://talosintelligence.com";
    this.name = "Talos";
  }

  searchByIP(query) {
    return this.search(query);
  }

  searchByDomain(query) {
    return this.search(query);
  }

  private search(query) {
    return `${this.endpoint}/reputation_center/lookup?search=${query}`;
  }
}
