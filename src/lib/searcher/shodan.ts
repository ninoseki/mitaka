import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Shodan implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    this.endpoint = `https://www.shodan.io`;
    this.name = "Shodan";
  }

  public searchByASN(query: string): string {
    return buildURL(this.endpoint, "/search", { query: `asn:${query}` });
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/host/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, "/search", { query: `hostname:${query}` });
  }
}
