import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class OTX implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.endpoint = "https://otx.alienvault.com";
    this.name = "OTX";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/indicator/ip/${query}`);
  }
  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/indicator/domain/${query}`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, `/indicator/file/${query}`);
  }
}
