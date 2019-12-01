import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class Censys implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "text"];

  public constructor() {
    this.baseURL = "https://censys.io";
    this.name = "Censys";
  }

  public searchByText(query: string): string {
    return buildURL(this.baseURL, "/ipv4", { q: query });
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ipv4/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/domain/${query}`);
  }

  public searchByASN(query: string): string {
    const matches = /\d+$/.exec(query);
    if (matches !== null && matches[0]) {
      return buildURL(this.baseURL, "/ipv4", {
        q: `autonomous_system.asn:${matches[0]}`,
      });
    }
    return "";
  }
}
