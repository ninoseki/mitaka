import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class PublicWWW implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["text"];

  public constructor() {
    this.baseURL = "https://publicwww.com";
    this.name = "PublicWWW";
  }

  public searchByText(query: string): string {
    return buildURL(this.baseURL, `/websites/${encodeURIComponent(query)}`);
  }
}
