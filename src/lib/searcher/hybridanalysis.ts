import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class HybridAnalysis implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.endpoint = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, "/search", { query: `${query}` });
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, "/search", { query: `host:${query}` });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, "/search", { query: `domain:${query}` });
  }
}
