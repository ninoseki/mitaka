import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class IntelligenceX implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "url",
    "email",
    "btc",
  ];

  constructor() {
    this.endpoint = "https://intelx.io";
    this.name = "IntelligenceX";
  }

  public searchByIP(query: string) {
    return this.search(query);
  }

  public searchByDomain(query: string) {
    return this.search(query);
  }

  public searchByURL(query: string) {
    return this.search(query);
  }

  public searchByEmail(query: string) {
    return this.search(query);
  }

  public searchByBTC(query: string) {
    return this.search(query);
  }

  private search(query: string) {
    return buildURL(this.endpoint, "/", { s: query });
  }
}
