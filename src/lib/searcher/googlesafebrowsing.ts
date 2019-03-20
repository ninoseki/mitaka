import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class GoogleSafeBrowsing implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "url"];

  public constructor() {
    this.endpoint = "https://transparencyreport.google.com";
    this.name = "GoogleSafeBrowsing";
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  public searchByURL(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.endpoint, "/safe-browsing/search", { url: query });
  }
}
