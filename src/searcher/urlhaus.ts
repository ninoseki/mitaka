import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class URLhaus implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://urlhaus.abuse.ch";
    this.name = "URLhaus";
  }

  public searchByIP(query: string): string {
    return this.searchByHost(query);
  }

  public searchByDomain(query: string): string {
    return this.searchByHost(query);
  }

  private searchByHost(host: string): string {
    return buildURL(this.baseURL, `/host/${host}/`);
  }
}
