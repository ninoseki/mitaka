import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class SpyOnWeb implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "gaPubID",
    "gaTrackID",
  ];

  public constructor() {
    this.endpoint = "http://spyonweb.com";
    this.name = "SpyOnWeb";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  public searchByGAPubID(query: string): string {
    return this.search(query);
  }

  public searchByGATrackID(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
