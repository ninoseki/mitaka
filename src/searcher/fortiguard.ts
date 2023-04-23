import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class FortiGuard implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "url", "cve"];

  public constructor() {
    this.baseURL = "https://fortiguard.com";
    this.name = "FortiGuard";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/search", { q: query, engine: 7 });
  }

  public searchByURL(query: string): string {
    return buildURL(this.baseURL, "/search", { q: query, engine: 7 });
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, "/search", { q: query, engine: 3 });
  }
}
