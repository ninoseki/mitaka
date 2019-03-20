import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class ViewDNS implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.endpoint = "https://viewdns.info";
    this.name = "ViewDNS";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, "/reverseip/", { t: 1, host: query });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, "/iphistory/", { domain: query });
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, "/reversewhois/", { q: query });
  }
}
