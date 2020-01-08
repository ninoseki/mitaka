import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class DomainWatch implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "email"];

  public constructor() {
    this.baseURL = "https://domainwat.ch";
    this.name = "DomainWatch";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/site/${query}`);
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, "/search", {
      query: `email:${query}`,
      type: "whois_raw",
    });
  }
}
