import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class FortiGuard implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "url", "cve"];

  public constructor() {
    this.endpoint = "https://fortiguard.com";
    this.name = "FortiGuard";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, "/search", { q: query, engine: 8 });
  }

  public searchByURL(query: string) {
    return buildURL(this.endpoint, "/webfilter", { q: query });
  }

  public searchByCVE(query: string) {
    return buildURL(this.endpoint, "/search", { q: query, engine: 3 });
  }
}
