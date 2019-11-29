import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class PublicWWW implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["text"];

  public constructor() {
    this.baseURL = "https://publicwww.com/websites";
    this.name = "PublicWWW";
  }

  public searchByText(query: string): string {
    return buildURL(this.baseURL, `/${encodeURIComponent(query)}`);
  }
}
