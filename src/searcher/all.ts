import type { SearchableType, Searcher } from "~/types";

export class All implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [];

  public constructor() {
    this.baseURL = "https://example.com";
    this.name = "all";
  }
}
