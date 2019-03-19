import { SearchableType, Searcher } from "./searcher";

export class Maltiverse implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "hash"];

  public constructor() {
    this.endpoint = "https://www.maltiverse.com";
    this.name = "Maltiverse";
  }

  public searchByDomain(query: string) {
    return `${this.endpoint}/search;query=domain:${query}`;
  }

  public searchByHash(query: string) {
    return `${this.endpoint}/search;query=${query}`;
  }
}
