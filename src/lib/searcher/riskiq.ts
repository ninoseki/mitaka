import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class RiskIQ implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.endpoint = "https://community.riskiq.com";
    this.name = "RiskIQ";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, `/search/${query}`);
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/search/${query}`);
  }

  public searchByEmail(query: string) {
    return buildURL(this.endpoint, `/search/whois/email/${query}`);
  }
}
