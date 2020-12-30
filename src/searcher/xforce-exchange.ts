import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/url_builder";

export class XForceExchange implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.baseURL = "https://exchange.xforce.ibmcloud.com";
    this.name = "X-Force-Exchange";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/url/${query}`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/malware/${query}`);
  }
}
