import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class HybridAnalysis implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.baseURL = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, "/search", { query: `${query}` });
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/search", { query: `host:${query}` });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/search", { query: `domain:${query}` });
  }
}
