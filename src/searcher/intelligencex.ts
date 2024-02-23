import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class IntelligenceX implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "url",
    "email",
    "btc",
  ];

  public constructor() {
    this.baseURL = "https://intelx.io";
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
    return buildURL(this.baseURL, "/", { s: query });
  }
}
