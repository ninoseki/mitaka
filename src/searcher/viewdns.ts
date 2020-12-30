import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/url_builder";

export class ViewDNS implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email"];

  public constructor() {
    this.baseURL = "https://viewdns.info";
    this.name = "ViewDNS";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/reverseip/", { t: 1, host: query });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/iphistory/", { domain: query });
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, "/reversewhois/", { q: query });
  }
}
