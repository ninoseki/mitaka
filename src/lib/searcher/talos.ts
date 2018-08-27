import { Searcher } from "./searcher";

export class Talos implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: string[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://talosintelligence.com";
    this.name = "Talos";
  }

  public searchByIP(query) {
    return this.search(query);
  }

  public searchByDomain(query) {
    return this.search(query);
  }

  private search(query) {
    return `${this.endpoint}/reputation_center/lookup?search=${query}`;
  }
}
