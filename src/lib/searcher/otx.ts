import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class OTX implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.baseURL = "https://otx.alienvault.com";
    this.name = "OTX";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/indicator/ip/${query}`);
  }
  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/indicator/domain/${query}`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/indicator/file/${query}`);
  }
}
