import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class Robtex implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip"];

  public constructor() {
    this.baseURL = "https://www.robtex.com";
    this.name = "Robtex";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/dns-lookup/${query}`);
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip-lookup/${query}`);
  }
}
