import { SearchableType, Searcher } from "../types";

export class Maltiverse implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "hash"];

  public constructor() {
    this.baseURL = "https://www.maltiverse.com";
    this.name = "Maltiverse";
  }

  public searchByDomain(query: string): string {
    return `${this.baseURL}/search;query=domain:${query}`;
  }

  public searchByHash(query: string): string {
    return `${this.baseURL}/search;query=${query}`;
  }
}
