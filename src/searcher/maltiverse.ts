import { sha256 } from "js-sha256";

import type { SearchableType, Searcher } from "~/types";

export class Maltiverse implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    this.baseURL = "https://www.maltiverse.com";
    this.name = "Maltiverse";
  }

  public searchByIP(query: string): string {
    return `${this.baseURL}/ip/${query}`;
  }

  public searchByDomain(query: string): string {
    return `${this.baseURL}/hostname/${query}`;
  }

  public searchByURL(query: string): string {
    const hash = sha256(query);
    return `${this.baseURL}/url/${hash}`;
  }

  public searchByHash(query: string): string {
    return `${this.baseURL}/search;query=${query}`;
  }
}
