import type { SearchableType, Searcher } from "@/types";
import { base64fy } from "@/utils";

export class Pulsedive implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url", "hash"];

  public constructor() {
    this.baseURL = "https://pulsedive.com";
    this.name = "Pulsedive";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }
  public searchByDomain(query: string): string {
    return this.search(query);
  }
  public searchByURL(query: string): string {
    return this.search(query);
  }
  public searchByHash(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return `${this.baseURL}/indicator/?ioc=${base64fy(query)}`;
  }
}
