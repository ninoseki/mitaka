import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class GoogleSafeBrowsing implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "url"];

  public constructor() {
    this.baseURL = "https://transparencyreport.google.com";
    this.name = "GoogleSafeBrowsing";
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  public searchByURL(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.baseURL, "/safe-browsing/search", { url: query });
  }
}
