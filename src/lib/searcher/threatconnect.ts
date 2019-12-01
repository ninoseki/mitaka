import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class ThreatConnect implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.baseURL = "https://app.threatconnect.com";
    this.name = "ThreatConnect";
  }

  public searchByIP(query: string): string {
    return this.searchByType("address", query);
  }

  public searchByDomain(query: string): string {
    return this.searchByType("host", query);
  }

  public searchByEmail(query: string): string {
    return this.searchByType("emailaddress", query);
  }

  private searchByType(type: string, query: string): string {
    const params = {};
    params[type] = query;

    return buildURL(
      this.baseURL,
      `/auth/indicators/details/${type}.xhtml`,
      params
    );
  }
}
