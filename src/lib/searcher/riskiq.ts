import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class RiskIQ implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "email",
    "gaTrackID",
  ];

  public constructor() {
    this.baseURL = "https://community.riskiq.com";
    this.name = "RiskIQ";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/search/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/search/${query}`);
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, `/search/whois/email/${query}`);
  }

  public searchByGATrackID(query: string): string {
    return buildURL(this.baseURL, `/search/trackers/${query.toLowerCase()}`);
  }
}
