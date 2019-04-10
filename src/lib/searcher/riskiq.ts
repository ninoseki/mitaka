import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class RiskIQ implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "email",
    "gaTrackID",
  ];

  public constructor() {
    this.endpoint = "https://community.riskiq.com";
    this.name = "RiskIQ";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/search/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/search/${query}`);
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, `/search/whois/email/${query}`);
  }

  public searchByGATrackID(query: string): string {
    return buildURL(this.endpoint, `/search/trackers/${query.toLowerCase()}`);
  }
}
