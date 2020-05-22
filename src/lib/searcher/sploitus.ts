import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class Sploitus implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.baseURL = "https://sploitus.com";
    this.name = "Sploitus";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, "/", { query });
  }
}
