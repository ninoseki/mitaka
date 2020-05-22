import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class Shodan implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    this.baseURL = `https://www.shodan.io`;
    this.name = "Shodan";
  }

  public searchByASN(query: string): string {
    return buildURL(this.baseURL, "/search", { query: `asn:${query}` });
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/host/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/search", { query: `hostname:${query}` });
  }
}
