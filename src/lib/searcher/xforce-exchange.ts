import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class XForceExchange implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.endpoint = "https://exchange.xforce.ibmcloud.com";
    this.name = "X-Force-Exchange";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/url/${query}`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, `/malware/${query}`);
  }
}
