import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class URLhaus implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.endpoint = "https://urlhaus.abuse.ch";
    this.name = "URLhaus";
  }

  public searchByIP(query: string): string {
    return this.searchByHost(query);
  }

  public searchByDomain(query: string): string {
    return this.searchByHost(query);
  }

  private searchByHost(host: string): string {
    return buildURL(this.endpoint, `/host/${host}/`);
  }
}
