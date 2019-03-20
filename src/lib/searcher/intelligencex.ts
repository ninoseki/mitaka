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

  public constructor() {
    this.endpoint = "https://intelx.io";
    this.name = "IntelligenceX";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  public searchByURL(query: string): string {
    return this.search(query);
  }

  public searchByEmail(query: string): string {
    return this.search(query);
  }

  public searchByBTC(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.endpoint, "/", { s: query });
  }
}
