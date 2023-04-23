import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Hashdd implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://hashdd.com";
    this.name = "Hashdd";
  }

  public searchByHash(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.baseURL, `/search/${query}`);
  }
}
