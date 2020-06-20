import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class Twitter implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["text"];

  public constructor() {
    this.baseURL = "https://twitter.com";
    this.name = "Twitter";
  }

  public searchByText(query: string): string {
    return buildURL(this.baseURL, `/search?q=${encodeURIComponent(query)}`);
  }
}
